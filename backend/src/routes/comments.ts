import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Comment } from "../types/Comment";
import { authenticate } from "../middleware/authenticate";
import { fetchReplies } from "../utils/fetchReplies";
import {
  insertComment,
  fetchCommentById,
  updateComment,
  fetchCommentOwner,
  deleteComment,
  toggleLike,
  fetchCommentLikes,
  fetchTotalComments,
} from "../services/commentService";

const router = express.Router();

router.get(
  "/:contentType/:contentId",
  authenticate,
  async (req: Request, res: Response) => {
    const { contentType, contentId } = req.params;
    const userId = req.user?.userId;
    const includeLikedStatus = req.query.includeLikedStatus === "true";

    // Use page for top-level comments, and limit/offset for replies
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const offset = parseInt(req.query.offset as string) || 0;

    const parentCommentId = req.query.parentCommentId
      ? parseInt(req.query.parentCommentId as string, 10)
      : null;

    try {
      const connection = await connectionPromise;

      let commentsQuery;
      let params;

      if (!parentCommentId) {
        // Fetch top-level comments using page
        const offset = (page - 1) * limit;
        commentsQuery = `
          SELECT c.*, u.name as user_name, u.profile_picture, 
                 EXISTS (SELECT 1 FROM comments r WHERE r.parent_comment_id = c.id) as has_replies 
          FROM comments c 
          JOIN users u ON c.user_id = u.id 
          WHERE c.content_type = ? AND c.content_id = ? AND c.parent_comment_id IS NULL
          ORDER BY c.created_at DESC
          LIMIT ? OFFSET ?
        `;
        params = [contentType, contentId, limit, offset];
      } else {
        // Fetch replies using limit and offset
        commentsQuery = `
          SELECT c.*, u.name as user_name, u.profile_picture, 
                 EXISTS (SELECT 1 FROM comments r WHERE r.parent_comment_id = c.id) as has_replies 
          FROM comments c 
          JOIN users u ON c.user_id = u.id 
          WHERE c.content_type = ? AND c.content_id = ? AND c.parent_comment_id = ?
          ORDER BY c.created_at ASC
          LIMIT ? OFFSET ?
        `;
        params = [contentType, contentId, parentCommentId, limit, offset];
      }

      const [rows] = await connection.query<RowDataPacket[]>(
        commentsQuery,
        params
      );

      if (!rows || rows.length === 0) {
        return res.status(200).json({ comments: [], hasMore: false });
      }

      let commentsWithReplies: Comment[] = rows as Comment[];

      if (parentCommentId) {
        // For replies, continue fetching nested replies using recursion if needed
        commentsWithReplies = await Promise.all(
          commentsWithReplies.map(async (comment) => {
            const { replies, hasMore } = await fetchReplies(
              connection,
              comment.id,
              limit,
              offset,
              userId
            );

            return {
              ...comment,
              replies,
              hasMoreReplies: hasMore,
            };
          })
        );
      }

      // Fetch liked status if required
      if (includeLikedStatus && userId) {
        const likedCommentIds = await fetchCommentLikes(userId);

        const setLikedStatus = (comments: Comment[]) => {
          comments.forEach((comment) => {
            comment.likedByUser = likedCommentIds.includes(comment.id);
            if (comment.replies && comment.replies.length > 0) {
              setLikedStatus(comment.replies);
            }
          });
        };

        setLikedStatus(commentsWithReplies);
      }

      // For top-level comments, calculate hasMore based on totalCount
      if (!parentCommentId) {
        const totalCount = await fetchTotalComments(
          contentType,
          Number(contentId)
        );
        const hasMore = offset + limit < totalCount;
        return res.json({ comments: commentsWithReplies, hasMore });
      }

      // For replies, use offset-based hasMore
      const hasMoreReplies = commentsWithReplies.length === limit;
      return res.json({
        comments: commentsWithReplies,
        hasMore: hasMoreReplies,
      });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

router.post("/", authenticate, async (req: Request, res: Response) => {
  const { content_id, content_type, content } = req.body as {
    content_id: number;
    content_type: "tutorial" | "blog";
    content: string;
    parent_comment_id?: number;
  };
  const { userId } = req.user!;

  try {
    const newCommentId = await insertComment(
      content_id,
      content_type,
      content,
      userId,
      null
    );

    const newComment = await fetchCommentById(newCommentId);

    res.json(newComment);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});
router.put("/:id", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { content } = req.body as { content: string };
  const { userId } = req.user!;

  try {
    const commentOwnerId = await fetchCommentOwner(Number(id));

    if (commentOwnerId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to edit this comment" });
    }

    await updateComment(Number(id), content);

    res.json({ id, content });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.post("/reply", authenticate, async (req: Request, res: Response) => {
  const { content_id, content_type, content, parent_comment_id } = req.body as {
    content_id: number;
    content_type: "tutorial" | "blog";
    content: string;
    parent_comment_id: number | null;
  };

  const { userId } = req.user!;

  try {
    const connection = await connectionPromise;

    const [results] = await connection.query<ResultSetHeader>(
      "INSERT INTO comments (content_id, content_type, content, user_id, parent_comment_id) VALUES (?, ?, ?, ?, ?)",
      [content_id, content_type, content, userId, parent_comment_id || null]
    );

    const [newReply] = await connection.query<RowDataPacket[]>(
      `SELECT c.*, u.name as user_name, u.profile_picture
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?`,
      [results.insertId]
    );

    if (newReply.length > 0) {
      const [parentCommentOwner] = await connection.query<RowDataPacket[]>(
        "SELECT user_id FROM comments WHERE id = ?",
        [parent_comment_id]
      );

      if (
        parentCommentOwner.length > 0 &&
        parentCommentOwner[0].user_id !== userId
      ) {
        await connection.execute(
          "INSERT INTO notifications (user_id, type, sender_id, is_read, created_at) VALUES (?, 'reply', ?, 0, NOW())",
          [parentCommentOwner[0].user_id, userId]
        );
      }

      res.json(newReply[0]);
    } else {
      res
        .status(500)
        .json({ error: "Failed to fetch the newly inserted reply." });
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

router.put(
  "/:id/toggle-like",
  authenticate,
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { userId } = req.user!;

    console.log(id);

    try {
      const totalLikes = await toggleLike(Number(id), userId);

      res.json({ id, likes: totalLikes });
    } catch (err) {
      const error = err as Error;
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { userId } = req.user!;

  try {
    const commentOwnerId = await fetchCommentOwner(Number(id));

    if (commentOwnerId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this comment" });
    }

    await deleteComment(Number(id));

    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// only returning top level comments for now
router.get("/user", authenticate, async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  // Optional pagination parameters
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 5;
  const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const offset = (page - 1) * limit;

  try {
    const connection = await connectionPromise;

    let query = `
      SELECT c.*, u.name as user_name, u.profile_picture
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.user_id = ? AND c.parent_comment_id IS NULL
      ORDER BY c.created_at DESC
    `;

    const queryParams: any[] = [userId, limit, offset];

    if (limit !== undefined && page !== undefined) {
      const offset = (page - 1) * limit;
      query += ` LIMIT ? OFFSET ?`;
      queryParams.push(limit, offset);
    }

    const [rows] = await connection.query<RowDataPacket[]>(query, queryParams);

    let hasMore: boolean | undefined = undefined;
    if (limit !== undefined && page !== undefined) {
      const [totalCountResult] = await connection.query<RowDataPacket[]>(
        "SELECT COUNT(*) as total FROM comments WHERE user_id = ? AND parent_comment_id IS NULL",
        [userId]
      );
      const totalCount = totalCountResult[0]?.total || 0;
      hasMore = page * limit < totalCount;
    }

    res.status(200).json({ comments: rows as Comment[], hasMore });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.get(
  "/all-comments",
  authenticate,
  async (req: Request, res: Response) => {
    console.log(req.params);
    try {
      const connection = await connectionPromise;

      const commentsQuery = `
      SELECT c.*, u.name as user_name, u.profile_picture
      FROM comments c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
    `;

      const [comments] = await connection.query<RowDataPacket[]>(commentsQuery);

      res.status(200).json({ comments });

      // Query to fetch all comments with user info
    } catch (err) {
      console.error("Error fetching all comments:", err);
      res.status(500).json({ error: (err as Error).message });
    }
  }
);
export default router;

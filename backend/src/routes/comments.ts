import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
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
  findTopLevelComment,
} from "../services/commentService";

const router = express.Router();

router.get(
  "/:contentType/:contentId",
  authenticate,
  async (req: Request, res: Response) => {
    const { contentType, contentId } = req.params;
    const userId = req.user?.userId;
    const includeLikedStatus = req.query.includeLikedStatus === "true";

    const page = parseInt(req.query.page as string) || 1;
    const topLevelLimit = parseInt(req.query.topLevelLimit as string) || 5;
    const replyLimit = parseInt(req.query.replyLimit as string) || 3;
    const offset = parseInt(req.query.offset as string) || 0;

    const parentCommentId = req.query.parentCommentId
      ? parseInt(req.query.parentCommentId as string, 10)
      : null;

    try {
      const connection = await connectionPromise;

      let commentsQuery;
      let params;

      if (!parentCommentId) {
        // Fetching top-level comments
        const offset = (page - 1) * topLevelLimit;
        commentsQuery = `
          SELECT c.*, u.name as user_name, u.profile_picture, 
                 EXISTS (SELECT 1 FROM comments r WHERE r.parent_comment_id = c.id) as has_replies 
          FROM comments c 
          JOIN users u ON c.user_id = u.id 
          WHERE c.content_type = ? AND c.content_id = ? AND c.parent_comment_id IS NULL
          ORDER BY c.created_at DESC
          LIMIT ? OFFSET ?
        `;
        params = [contentType, contentId, topLevelLimit, offset];
      } else {
        // Fetching replies, but fetching `replyLimit + 1` to check if there are more
        commentsQuery = `
          SELECT c.*, u.name as user_name, u.profile_picture, 
                 EXISTS (SELECT 1 FROM comments r WHERE r.parent_comment_id = c.id) as has_replies 
          FROM comments c 
          JOIN users u ON c.user_id = u.id 
          WHERE c.content_type = ? AND c.content_id = ? AND c.parent_comment_id = ?
          ORDER BY c.created_at ASC
          LIMIT ? OFFSET ?
        `;
        params = [
          contentType,
          contentId,
          parentCommentId,
          replyLimit + 1,
          offset,
        ];
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
        const hasMoreReplies = commentsWithReplies.length > replyLimit;

        commentsWithReplies = commentsWithReplies.slice(0, replyLimit);

        commentsWithReplies = await Promise.all(
          commentsWithReplies.map(async (comment) => {
            const { replies, hasMore } = await fetchReplies(
              connection,
              comment.id,
              replyLimit,
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

        return res.json({
          comments: commentsWithReplies,
          hasMore: hasMoreReplies,
        });
      }

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

      if (!parentCommentId) {
        const totalCount = await fetchTotalComments(
          contentType,
          Number(contentId)
        );
        const hasMore = offset + topLevelLimit < totalCount;
        return res.json({ comments: commentsWithReplies, hasMore });
      }
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
          "INSERT INTO notifications (user_id, type, sender_id, comment_id, content_id, content_type, is_read, created_at) VALUES (?, 'reply', ?, ?, ?, ?, 0, NOW())",
          [
            parentCommentOwner[0].user_id,
            userId,
            parent_comment_id,
            content_id,
            content_type,
          ]
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

router.get(
  "/users/:id/comment-history",
  authenticate,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);

    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 5;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const offset = (page - 1) * limit;

    try {
      const connection = await connectionPromise;

      let query = `
        SELECT c.*, u.name as user_name, u.profile_picture
        FROM comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.user_id = ?
        ORDER BY c.created_at DESC
      `;

      const queryParams: any[] = [id, limit, offset];

      if (limit !== undefined && page !== undefined) {
        query += ` LIMIT ? OFFSET ?`;
        queryParams.push(limit, offset);
      }

      const [rows] = await connection.query<RowDataPacket[]>(
        query,
        queryParams
      );

      let hasMore: boolean | undefined = undefined;
      if (limit !== undefined && page !== undefined) {
        const [totalCountResult] = await connection.query<RowDataPacket[]>(
          "SELECT COUNT(*) as total FROM comments WHERE user_id = ?",
          [id]
        );
        const totalCount = totalCountResult[0]?.total || 0;
        hasMore = page * limit < totalCount;
      }

      res.status(200).json({ comments: rows as Comment[], hasMore });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

router.get(
  "/reply-and-parent",
  authenticate,
  async (req: Request, res: Response) => {
    const { id } = req.query;
    console.log("Query params received:", req.query);

    try {
      const connection = await connectionPromise;

      let commentsQuery = `
      SELECT c.*, u.name as user_name, u.profile_picture, c.parent_comment_id
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `;

      const params: any[] = [Number(id)];

      const [comments] = await connection.query<RowDataPacket[]>(
        commentsQuery,
        params
      );

      if (comments.length === 0) {
        return res.status(404).json({ message: "Comment not found" });
      }

      const initialComment = comments[0];

      if (initialComment.parent_comment_id === null) {
        console.log(`Comment with id ${id} is a top-level comment`);
        return res.status(200).json({
          initialComment,
          topLevelComment: initialComment, // Since it's already a top-level comment
        });
      }

      // Call the helper function to traverse upwards and find the top-level comment
      const topLevelComment = await findTopLevelComment(Number(id), connection);

      if (topLevelComment) {
        console.log(`The top-level parent comment is:`, topLevelComment);
      }

      res.status(200).json({
        initialComment, // The comment requested by id
        topLevelComment, // The top-level parent comment found
      });
    } catch (err) {
      console.error("Error fetching all comments:", err);
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

export default router;

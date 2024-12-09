import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { Comment } from "../types/Comment";
import { authenticate } from "../middleware/authenticate";
import { csrfProtection } from "../middleware/csrf";
import { fetchReplies } from "../utils/fetchReplies";
import {
  insertComment,
  fetchCommentById,
  updateComment,
  fetchCommentOwner,
  deleteComment,
  fetchCommentLikes,
  fetchTotalComments,
  findTopLevelComment,
} from "../services/commentService";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const router = express.Router();

router.get("/:contentType/:contentId", async (req: Request, res: Response) => {
  const { contentType, contentId } = req.params;
  const userId = getUserIdFromToken(req.headers.authorization);
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
});

router.post(
  "/",
  authenticate,
  csrfProtection,
  async (req: Request, res: Response) => {
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
  }
);

router.put(
  "/:id",
  authenticate,
  csrfProtection,
  async (req: Request, res: Response) => {
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
  }
);

router.post(
  "/reply",
  authenticate,
  csrfProtection,
  async (req: Request, res: Response) => {
    const { content_id, content_type, content, parent_comment_id } =
      req.body as {
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
              results.insertId,
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
  }
);

router.put(
  "/:id/toggle-like",
  authenticate,
  csrfProtection,
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { userId } = req.user!;

    try {
      const connection = await connectionPromise;

      const [existingLike] = await connection.query<RowDataPacket[]>(
        "SELECT user_id FROM comment_likes WHERE comment_id = ? AND user_id = ?",
        [Number(id), userId]
      );

      let totalLikes;

      if (existingLike.length > 0) {
        await connection.execute(
          "DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?",
          [Number(id), userId]
        );

        await connection.execute(
          "UPDATE comments SET likes = likes - 1 WHERE id = ?",
          [Number(id)]
        );

        const [updatedLikes] = await connection.query<RowDataPacket[]>(
          "SELECT likes FROM comments WHERE id = ?",
          [Number(id)]
        );
        totalLikes = updatedLikes[0].likes;

        await connection.execute(
          "DELETE FROM notifications WHERE user_id = ? AND sender_id = ? AND comment_id = ? AND type = 'like'",
          [existingLike[0].user_id, userId, Number(id)]
        );
      } else {
        await connection.execute(
          "INSERT INTO comment_likes (comment_id, user_id) VALUES (?, ?)",
          [Number(id), userId]
        );
        await connection.execute(
          "UPDATE comments SET likes = likes + 1 WHERE id = ?",
          [Number(id)]
        );

        const [updatedLikes] = await connection.query<RowDataPacket[]>(
          "SELECT likes FROM comments WHERE id = ?",
          [Number(id)]
        );
        totalLikes = updatedLikes[0].likes;

        const [commentOwner] = await connection.query<RowDataPacket[]>(
          "SELECT user_id FROM comments WHERE id = ?",
          [Number(id)]
        );

        if (commentOwner.length > 0 && commentOwner[0].user_id !== userId) {
          await connection.execute(
            "INSERT INTO notifications (user_id, type, sender_id, comment_id, content_id, content_type, is_read, created_at) VALUES (?, 'like', ?, ?, NULL, 'comment', 0, NOW())",
            [commentOwner[0].user_id, userId, Number(id)]
          );
        }
      }

      res.json({ id, likes: totalLikes });
    } catch (err) {
      const error = err as Error;
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/:id",
  authenticate,
  csrfProtection,
  async (req: Request, res: Response) => {
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
  }
);

router.get(
  "/users/:id/comment-history",

  async (req: Request, res: Response) => {
    const { id } = req.params;

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

router.get("/reply-and-parent", async (req: Request, res: Response) => {
  const { id } = req.query;

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
      return res.status(200).json({
        initialComment,
        topLevelComment: initialComment,
      });
    }

    const topLevelComment = await findTopLevelComment(Number(id), connection);

    res.status(200).json({
      initialComment,
      topLevelComment,
    });
  } catch (err) {
    console.error("Error fetching all comments:", err);
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;

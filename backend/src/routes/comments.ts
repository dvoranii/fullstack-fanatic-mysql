import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Comment } from "../types/Comment";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.get(
  "/:contentType/:contentId",
  authenticate,
  async (req: Request, res: Response) => {
    const { contentType, contentId } = req.params;
    const userId = req.user?.userId;
    const includeLikedStatus = req.query.includeLikedStatus === "true";

    try {
      const connection = await connectionPromise;
      const [comments] = await connection.query<RowDataPacket[]>(
        `SELECT c.*, u.name as user_name, u.profile_picture 
         FROM comments c 
         JOIN users u ON c.user_id = u.id 
         WHERE c.content_type = ? AND c.content_id = ? AND c.parent_comment_id IS NULL 
         ORDER BY c.created_at DESC`,
        [contentType, contentId]
      );

      const [replies] = await connection.query<RowDataPacket[]>(
        `SELECT c.*, u.name as user_name, u.profile_picture 
         FROM comments c 
         JOIN users u ON c.user_id = u.id 
         WHERE c.content_type = ? AND c.content_id = ? AND c.parent_comment_id IS NOT NULL 
         ORDER BY c.created_at ASC`,
        [contentType, contentId]
      );

      const repliesByParentId: Record<number, Comment[]> = replies.reduce(
        (acc: Record<number, Comment[]>, reply: RowDataPacket) => {
          const typedReply = reply as Comment;

          if (typedReply.parent_comment_id !== undefined) {
            if (!acc[typedReply.parent_comment_id]) {
              acc[typedReply.parent_comment_id] = [];
            }
            acc[typedReply.parent_comment_id].push(typedReply);
          }

          return acc;
        },
        {}
      );

      comments.forEach((comment) => {
        comment.replies = repliesByParentId[comment.id] || [];
      });

      if (includeLikedStatus && userId) {
        const [likedComments] = await connection.query<RowDataPacket[]>(
          `SELECT comment_id FROM comment_likes WHERE user_id = ?`,
          [userId]
        );
        const likedCommentIds = likedComments.map((row) => row.comment_id);

        (comments as Comment[]).forEach((comment) => {
          comment.likedByUser = likedCommentIds.includes(comment.id);
          if (comment.replies) {
            comment.replies.forEach((reply) => {
              reply.likedByUser = likedCommentIds.includes(reply.id);
            });
          }
        });
      }

      res.json(comments as Comment[]);
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
  };
  const { userId } = req.user!;

  try {
    const connection = await connectionPromise;
    const [results] = await connection.query<ResultSetHeader>(
      "INSERT INTO comments (content_id, content_type, content, user_id, parent_comment_id) VALUES (?, ?, ?, ?, ?)",
      [content_id, content_type, content, userId, null]
    );
    res.json({ id: results.insertId, content_id, content_type, content });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { content } = req.body as { content: string };
  const { userId } = req.user!;
  try {
    const connection = await connectionPromise;
    const [existing] = await connection.query<RowDataPacket[]>(
      "SELECT user_id FROM comments WHERE id = ?",
      [id]
    );

    if (existing.length === 0 || existing[0].user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to edit this comment" });
    }

    await connection.query<ResultSetHeader>(
      "UPDATE comments SET content = ? WHERE id = ?",
      [content, id]
    );
    res.json({ id, content });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
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

    res.json({
      id: results.insertId,
      content_id,
      content_type,
      content,
      parent_comment_id,
    });
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

    try {
      const connection = await connectionPromise;

      const [existingLike] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM comment_likes WHERE comment_id = ? AND user_id = ?",
        [id, userId]
      );

      if (existingLike.length > 0) {
        await connection.query<ResultSetHeader>(
          "DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?",
          [id, userId]
        );
      } else {
        await connection.query<ResultSetHeader>(
          "INSERT INTO comment_likes (comment_id, user_id) VALUES (?, ?)",
          [id, userId]
        );
      }

      const [likesResult] = await connection.query<RowDataPacket[]>(
        "SELECT COUNT(*) AS likes FROM comment_likes WHERE comment_id = ?",
        [id]
      );
      const totalLikes = likesResult[0].likes;

      await connection.query<ResultSetHeader>(
        "UPDATE comments SET likes = ? WHERE id = ?",
        [totalLikes, id]
      );

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
    const connection = await connectionPromise;
    const [existing] = await connection.query<RowDataPacket[]>(
      "SELECT user_id FROM comments WHERE id = ?",
      [id]
    );

    if (existing.length === 0 || existing[0].user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this comment" });
    }

    await connection.query<ResultSetHeader>(
      "DELETE FROM comments WHERE id = ?",
      [id]
    );

    res.json({ id });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

export default router;

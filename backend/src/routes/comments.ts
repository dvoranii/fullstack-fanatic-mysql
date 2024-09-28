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
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT c.*, u.name as user_name, u.profile_picture 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.content_type = ? AND c.content_id = ? 
       ORDER BY c.created_at DESC`,
        [contentType, contentId]
      );

      const commentMap = new Map<number, Comment>();

      rows.forEach((row) => {
        commentMap.set(row.id, {
          ...(row as Comment),
          replies: [],
        });
      });

      const comments: Comment[] = [];

      commentMap.forEach((comment) => {
        if (comment.parent_comment_id) {
          const parentComment = commentMap.get(comment.parent_comment_id);
          if (parentComment) {
            parentComment.replies!.push(comment);
          }
        } else {
          comments.push(comment);
        }
      });

      if (includeLikedStatus && userId) {
        const [likedComments] = await connection.query<RowDataPacket[]>(
          `SELECT comment_id FROM comment_likes WHERE user_id = ?`,
          [userId]
        );
        const likedCommentIds = likedComments.map((row) => row.comment_id);

        const setLikedStatus = (comments: Comment[]) => {
          comments.forEach((comment) => {
            comment.likedByUser = likedCommentIds.includes(comment.id);
            if (comment.replies && comment.replies.length > 0) {
              setLikedStatus(comment.replies);
            }
          });
        };

        setLikedStatus(comments);
      }

      res.json(comments);
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

    const [newComment] = await connection.query<RowDataPacket[]>(
      `SELECT c.*, u.name as user_name, u.profile_picture
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?`,
      [results.insertId]
    );

    res.json(newComment[0]);
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

      const [commentOwner] = await connection.query<RowDataPacket[]>(
        "SELECT user_id FROM comments WHERE id = ?",
        [id]
      );

      if (commentOwner.length > 0 && commentOwner[0].user_id !== userId) {
        await connection.execute(
          "INSERT INTO notifications (user_id, type, sender_id, is_read, created_at) VALUES (?, 'like', ?, 0, NOW())",
          [commentOwner[0].user_id, userId]
        );
      }

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

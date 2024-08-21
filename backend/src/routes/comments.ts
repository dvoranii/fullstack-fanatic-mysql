import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Comment } from "../types/Comment";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.get("/:contentType/:contentId", async (req: Request, res: Response) => {
  const { contentType, contentId } = req.params as {
    contentType: string;
    contentId: string;
  };
  console.log(`Fetching comments for ${contentType} with ID ${contentId}`);
  try {
    const connection = await connectionPromise;
    const [results] = await connection.query<RowDataPacket[]>(
      "Select c.*, u.name as user_name, u.profile_picture as user_picture FROM comments c JOIN users u ON c.user_id = u.id WHERE c.content_type = ? AND content_id = ?",
      [contentType, contentId]
    );
    console.log(results);
    res.json(results as Comment[]);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

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
      "INSERT INTO comments (content_id, content_type, content, user_id) VALUES (?, ?, ?, ?)",
      [content_id, content_type, content, userId]
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

  console.log(`Updating comment with ID ${id}`);
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

router.put(
  "/:id/toggle-like",
  authenticate,
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { userId } = req.user!;

    console.log(`User ${userId} is toggling like for comment with ID ${id}`);

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

  console.log(`Deleting comment with ID ${id} by user ${userId}`);

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

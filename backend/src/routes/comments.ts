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
      "SELECT * FROM comments WHERE content_type = ? AND content_id = ?",
      [contentType, contentId]
    );
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
      const [results] = await connection.query<RowDataPacket[]>(
        "SELECT likes FROM comments WHERE id = ?",
        [id]
      );
      const currentLikes = (results[0] as Comment).likes;
      const newLikes =
        currentLikes % 2 === 0 ? currentLikes + 1 : currentLikes - 1;
      await connection.query<ResultSetHeader>(
        "UPDATE comments SET likes = ? WHERE id = ?",
        [newLikes, id]
      );
      res.json({ id, likes: newLikes });
    } catch (err) {
      const error = err as Error;
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

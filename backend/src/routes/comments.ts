import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Comment } from "../types/Comment";

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

router.post("/", async (req: Request, res: Response) => {
  const { content_id, content_type, content } = req.body as {
    content_id: number;
    content_type: "tutorial" | "blog";
    content: string;
  };

  try {
    const connection = await connectionPromise;
    const [results] = await connection.query<ResultSetHeader>(
      "INSERT INTO comments (content_id, content_type, content) VALUES (?, ?, ?)",
      [content_id, content_type, content]
    );
    res.json({ id: results.insertId, content_id, content_type, content });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { content } = req.body as { content: string };
  console.log(`Updating comment with ID ${id}`);
  try {
    const connection = await connectionPromise;
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

router.put("/:id/toggle-like", async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  console.log(`Toggling like for comment with ID ${id}`);
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
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  console.log(`Deleting comment with ID ${id}`);
  try {
    const connection = await connectionPromise;
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

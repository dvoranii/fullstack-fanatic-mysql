import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

const router = express.Router();

interface Comment {
  id: number;
  tutorial_id: number;
  content: string;
  created_at: string;
  likes: number;
}

router.get("/:tutorialId", async (req: Request, res: Response) => {
  const { tutorialId } = req.params as { tutorialId: string };
  try {
    const connection = await connectionPromise;
    const [results] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM comments WHERE tutorial_id = ?",
      [tutorialId]
    );
    res.json(results as Comment[]);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { tutorial_id, content } = req.body as {
    tutorial_id: number;
    content: string;
  };
  try {
    const connection = await connectionPromise;
    const [results] = await connection.query<ResultSetHeader>(
      "INSERT INTO comments (tutorial_id, content) VALUES (?, ?)",
      [tutorial_id, content]
    );
    res.json({ id: results.insertId, tutorial_id, content });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { content } = req.body as { content: string };
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

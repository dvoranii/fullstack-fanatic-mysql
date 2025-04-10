import express, { Request, Response } from "express";
import connectionPromise from "../db/db";
import { RowDataPacket } from "mysql2";
import { Blog } from "../types/Blog";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const connection = await connectionPromise;
    const [results] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM blogs"
    );
    res.json(results as Blog[]);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    const connection = await connectionPromise;
    const [results] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM blogs WHERE id = ?",
      [id]
    );
    res.json(results[0] as Blog);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

export default router;

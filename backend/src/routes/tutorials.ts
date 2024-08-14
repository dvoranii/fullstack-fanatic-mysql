import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket } from "mysql2";
import { Tutorial } from "../types/Tutorial";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const connection = await connectionPromise;
    const [results] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM tutorials"
    );
    res.json(results as Tutorial[]);
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
      "SELECT * FROM tutorials WHERE id = ?",
      [id]
    );
    res.json(results[0] as Tutorial);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

export default router;

import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
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

router.post("/favourites", (req: Request, res: Response) => {
  const { google_id, tutorial_id, isFavourited } = req.body;
  console.log(google_id, tutorial_id, isFavourited);

  res.status(200).json({ message: "Request body received" });
});

export default router;

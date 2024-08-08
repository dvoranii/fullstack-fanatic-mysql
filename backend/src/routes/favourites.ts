import { Router, Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket } from "mysql2";
import { ContentType } from "../types/ContentType";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const {
    google_id,
    item_id,
    user_id,
    content_type,
  }: {
    google_id: string;
    item_id: number;
    user_id: number;
    content_type: ContentType;
  } = req.body;

  console.log(req.body);

  try {
    const connection = await connectionPromise;

    const [existing] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM favourites WHERE google_id = ? AND item_id = ? AND content_type = ?`,
      [google_id, item_id, content_type]
    );

    if (existing.length === 0) {
      await connection.query(
        `INSERT INTO favourites (google_id, item_id, user_id, content_type) VALUES (?, ?, ?, ?)`,
        [google_id, item_id, user_id, content_type]
      );
      res.status(200).json({ message: "Favourite added" });
    } else {
      res.status(200).json({ message: "Favourite already exists" });
    }
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Failed to update favourites" });
  }
});

router.delete("/", async (req: Request, res: Response) => {
  const { google_id, item_id, user_id, content_type } = req.body;

  if (!google_id || !item_id || !user_id || !content_type) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const connection = await connectionPromise;

    const [existing] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM favourites WHERE google_id = ? AND item_id = ? AND user_id = ? AND content_type = ?`,
      [google_id, item_id, user_id, content_type]
    );

    if (existing.length > 0) {
      await connection.query(
        `DELETE FROM favourites WHERE google_id = ? AND item_id = ? AND user_id = ? AND content_type = ?`,
        [google_id, item_id, user_id, content_type]
      );
      res.status(200).json({ message: "Favourite removed" });
    } else {
      res.status(404).json({ message: "Favourite not found" });
    }
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Failed to update favourites" });
  }
});

export default router;

import { Router, Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket } from "mysql2";
import { ContentType } from "../types/ContentType";
import { DeleteFavouriteQuery } from "../types/favourites";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const {
    google_id,
    item_id,
    user_id,
    item_type,
  }: {
    google_id: string;
    item_id: number;
    user_id: number;
    item_type: ContentType;
  } = req.body;

  console.log(req.body);

  try {
    const connection = await connectionPromise;

    const idColumn = item_type === "tutorial" ? "tutorial_id" : "blog_id";

    const [existing] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM favourites WHERE google_id = ? AND ${idColumn} = ?`,
      [google_id, item_id]
    );

    if (existing.length === 0) {
      await connection.query(
        `INSERT INTO favourites (google_id, ${idColumn}, user_id) VALUES (?, ?, ?)`,
        [google_id, item_id, user_id]
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
  const queryParams = req.query as unknown as DeleteFavouriteQuery;

  const { google_id, item_id, user_id, item_type } = queryParams;

  if (!google_id || !item_id || !user_id || !item_type) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const connection = await connectionPromise;

    const idColumn = item_type === "tutorial" ? "tutorial_id" : "blog_id";

    const [existing] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM favourites WHERE google_id = ? AND ${idColumn} = ? AND user_id = ?`,
      [google_id, item_id, user_id]
    );

    if (existing.length > 0) {
      await connection.query(
        `DELETE FROM favourites WHERE google_id = ? AND ${idColumn} = ? AND user_id = ?`,
        [google_id, item_id, user_id]
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

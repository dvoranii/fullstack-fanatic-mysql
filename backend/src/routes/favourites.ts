import { Router, Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.get("/", authenticate, async (req: Request, res: Response) => {
  const { userId } = req.user!;

  try {
    const connection = await connectionPromise;

    const [tutorials] = await connection.query<RowDataPacket[]>(
      `SELECT t.* FROM tutorials t
       JOIN favourites f ON t.id = f.item_id
       WHERE f.user_id = ? AND f.content_type = 'tutorial'`,
      [userId]
    );

    const [blogs] = await connection.query<RowDataPacket[]>(
      `
      SELECT b.* FROM blogs b
      JOIN favourites f ON b.id = f.item_id
      WHERE f.user_id = ? AND f.content_type = 'blog'
      `,
      [userId]
    );

    res.json({ tutorials, blogs });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Failed to fetch favourites" });
  }
});

router.post("/", authenticate, async (req: Request, res: Response) => {
  const { item_id, content_type }: { item_id: number; content_type: string } =
    req.body;
  const { userId: user_id, googleId: google_id } = req.user!;

  try {
    const connection = await connectionPromise;

    const [existing] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM favourites WHERE (google_id = ? OR google_id IS NULL) AND item_id = ? AND user_id = ? AND content_type = ?`,
      [google_id, item_id, user_id, content_type]
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

router.delete("/", authenticate, async (req: Request, res: Response) => {
  const { item_id, content_type } = req.body;
  const { userId: user_id, googleId: google_id } = req.user!;

  if (!item_id || !content_type) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const connection = await connectionPromise;

    const [existing] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM favourites WHERE (google_id = ? OR google_id IS NULL) AND item_id = ? AND user_id = ? AND content_type = ?`,
      [google_id, item_id, user_id, content_type]
    );

    console.log("Existing Favourites:", existing);

    if (existing.length > 0) {
      await connection.query(
        `DELETE FROM favourites WHERE (google_id = ? OR google_id IS NULL) AND item_id = ? AND user_id = ? AND content_type = ?`,
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

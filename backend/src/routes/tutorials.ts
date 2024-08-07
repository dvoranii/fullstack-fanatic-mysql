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

router.post("/favourites", async (req: Request, res: Response) => {
  const { google_id, tutorial_id, user_id } = req.body;
  console.log(req.body);

  try {
    const connection = await connectionPromise;

    const [existing] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM favourites WHERE google_id = ? AND tutorial_id = ?",
      [google_id, tutorial_id]
    );

    if (existing.length === 0) {
      await connection.query(
        "INSERT INTO favourites (google_id, tutorial_id, user_id) VALUES (?, ?, ?)",
        [google_id, tutorial_id, user_id]
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

router.delete("/favourites", async (req: Request, res: Response) => {
  const { google_id, tutorial_id, user_id } = req.query;

  if (!google_id || !tutorial_id || !user_id) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const connection = await connectionPromise;

    // Check if the favourite exists
    const [existing] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM favourites WHERE google_id = ? AND tutorial_id = ? AND user_id = ?",
      [google_id, tutorial_id, user_id]
    );

    if (existing.length > 0) {
      // Remove the favourite if it exists
      await connection.query(
        "DELETE FROM favourites WHERE google_id = ? AND tutorial_id = ? AND user_id = ?",
        [google_id, tutorial_id, user_id]
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

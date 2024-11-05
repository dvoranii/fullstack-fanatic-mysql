import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    console.log(userId);

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const connection = await connectionPromise;
    const query = "SELECT * FROM purchases WHERE user_id = ?";
    const [purchases] = await connection.execute<RowDataPacket[]>(query, [
      userId,
    ]);

    if (purchases.length === 0) {
      return res.status(404).json({ message: "No purchases found" });
    }

    res.status(200).json({ purchases });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

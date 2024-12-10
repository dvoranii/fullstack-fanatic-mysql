import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";
import { PurchasedItem } from "../types/PurchasedItem";

const router = express.Router();

router.get(
  "/",
  authenticate,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }

      const connection = await connectionPromise;
      const query = "SELECT * FROM purchases WHERE user_id = ?";
      const [purchases] = await connection.execute<RowDataPacket[]>(query, [
        userId,
      ]);

      res.status(200).json({
        purchases: purchases.length ? (purchases as PurchasedItem[]) : [],
      });
    } catch (error) {
      console.error("Error fetching purchases:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;

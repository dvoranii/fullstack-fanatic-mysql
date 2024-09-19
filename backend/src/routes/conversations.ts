import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.post("/", authenticate, async (req: Request, res: Response) => {
  const { user1_id, user2_id, subject } = req.body;

  try {
    const connection = await connectionPromise;

    const [existingConversation] = await connection.execute<RowDataPacket[]>(
      "SELECT id FROM conversations WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)",
      [user1_id, user2_id, user2_id, user1_id]
    );

    if (existingConversation.length > 0) {
      return res.status(200).json({ id: existingConversation[0].id });
    }

    const [result] = await connection.execute<ResultSetHeader>(
      "INSERT INTO conversations (user1_id, user2_id,subject, created_at) VALUES (?, ?, NOW())",
      [user1_id, user2_id, subject]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

router.get(
  "/:conversationId",
  authenticate,
  async (req: Request, res: Response) => {
    const { conversationId } = req.params;

    try {
      const connection = await connectionPromise;

      const [conversation] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM conversations WHERE id = ?",
        [conversationId]
      );

      if (conversation.length === 0) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      res.status(200).json(conversation[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  }
);

router.get("/", authenticate, async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const connection = await connectionPromise;

    const [conversations] = await connection.execute<RowDataPacket[]>(
      `SELECT * FROM conversations 
         WHERE user1_id = ? OR user2_id = ?`,
      [userId, userId]
    );

    res.status(200).json(conversations);
  } catch (err) {
    console.error("Error fetching conversations:", err);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});

export default router;

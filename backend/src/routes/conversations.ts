import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.post(
  "/conversations",
  authenticate,
  async (req: Request, res: Response) => {
    const { user1_id, user2_id } = req.body;

    try {
      const connection = await connectionPromise;
      const [existingConversation] = await connection.execute<RowDataPacket[]>(
        "SELECT id FROM conversations WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)",
        [user1_id, user2_id, user2_id, user1_id]
      );

      // If conversation already exists, return the conversation id
      if (existingConversation.length > 0) {
        return res.status(200).json(existingConversation[0]);
      }

      // If no conversation exists, create a new one
      const [result] = await connection.execute<ResultSetHeader>(
        "INSERT INTO conversations (user1_id, user2_id, created_at) VALUES (?, ?, NOW())",
        [user1_id, user2_id]
      );

      // Return the newly created conversation id
      res.status(201).json({ id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  }
);

router.get(
  "/conversations",
  authenticate,
  async (req: Request, res: Response) => {
    const userId = req.user?.userId; // Get the logged-in user's ID from the token

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
  }
);

// router.get(
//   "/conversations/:conversation_id",
//   authenticate,
//   async (req: Request, res: Response) => {
//     const { conversation_id } = req.params;
//     const conversationIdAsNumber = Number(conversation_id);

//     try {
//       const connection = await connectionPromise;
//       const [messages] = await connection.execute<RowDataPacket[]>(
//         "SELECT * FROM messages WHERE conversation_id = ? ORDER BY sent_at",
//         [conversationIdAsNumber]
//       );

//       res.status(200).json(messages);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Failed to fetch conversation" });
//     }
//   }
// );

export default router;

import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();
router.post("/messages", authenticate, async (req: Request, res: Response) => {
  const { conversation_id, sender_id, receiver_id, subject, content } =
    req.body;

  try {
    const connection = await connectionPromise;
    await connection.execute<ResultSetHeader>(
      "INSERT INTO messages (conversation_id, sender_id, receiver_id, subject, content, is_read, sent_at) VALUES (?, ?, ?, ?, ?, 0, NOW())",
      [
        conversation_id || null,
        sender_id || null,
        receiver_id || null,
        subject || null,
        content || null,
      ]
    );
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

router.get("/messages/:conversationId", authenticate, async (req, res) => {
  const { conversationId } = req.params;

  const conversationIdAsNumber = Number(conversationId);
  try {
    const connection = await connectionPromise;
    const [messages] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM messages WHERE conversation_id = ? ORDER BY sent_at",
      [conversationIdAsNumber]
    );
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;

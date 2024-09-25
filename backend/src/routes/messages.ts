import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";
import { io } from "../app";

const router = express.Router();

router.post("/", authenticate, async (req: Request, res: Response) => {
  const { conversation_id, sender_id, receiver_id, content } = req.body;

  try {
    const connection = await connectionPromise;

    const [result] = await connection.execute<ResultSetHeader>(
      "INSERT INTO messages (conversation_id, sender_id, receiver_id, content, sent_at) VALUES (?, ?, ?, ?, NOW())",
      [
        conversation_id || null,
        sender_id || null,
        receiver_id || null,
        content || null,
      ]
    );

    const newMessage = {
      id: result.insertId,
      conversation_id,
      sender_id,
      receiver_id,
      content,
      sent_at: new Date(),
    };

    await connection.execute<ResultSetHeader>(
      "UPDATE conversations SET is_read = false WHERE id = ? AND user2_id = ?",
      [conversation_id, receiver_id]
    );

    io.to(`conversation_${conversation_id}`).emit("newMessage", newMessage);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

router.get("/:conversationId", authenticate, async (req, res) => {
  const { conversationId } = req.params;

  const conversationIdAsNumber = Number(conversationId);
  try {
    const connection = await connectionPromise;
    const [messages] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM messages WHERE conversation_id = ? ORDER BY sent_at",
      [conversationIdAsNumber]
    );

    const userId = req.user?.userId;
    await connection.execute<ResultSetHeader>(
      "UPDATE conversations SET is_read = true WHERE id = ? AND (user1_id = ? OR user2_id = ?)",
      [conversationIdAsNumber, userId, userId]
    );

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;

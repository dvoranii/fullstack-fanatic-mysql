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

    const [conversation] = await connection.execute<RowDataPacket[]>(
      "SELECT user1_id, user2_id FROM conversations WHERE id = ?",
      [conversation_id]
    );

    if (conversation.length === 0) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const { user1_id, user2_id } = conversation[0];

    if (receiver_id === user1_id) {
      await connection.execute<ResultSetHeader>(
        "UPDATE conversations SET is_deleted_user1 = FALSE WHERE id = ?",
        [conversation_id]
      );
    } else if (receiver_id === user2_id) {
      await connection.execute<ResultSetHeader>(
        "UPDATE conversations SET is_deleted_user2 = FALSE WHERE id = ?",
        [conversation_id]
      );
    }

    const [result] = await connection.execute<ResultSetHeader>(
      "INSERT INTO messages (conversation_id, sender_id, receiver_id, content, sent_at) VALUES (?, ?, ?, ?, NOW())",
      [conversation_id, sender_id, receiver_id, content]
    );

    const newMessage = {
      id: result.insertId,
      conversation_id,
      sender_id,
      receiver_id,
      content,
      sent_at: new Date(),
    };

    if (sender_id !== receiver_id) {
      if (receiver_id === user1_id) {
        await connection.execute<ResultSetHeader>(
          `UPDATE conversations 
           SET is_read_user1 = FALSE 
           WHERE id = ?`,
          [conversation_id]
        );
      } else if (receiver_id === user2_id) {
        await connection.execute<ResultSetHeader>(
          `UPDATE conversations 
           SET is_read_user2 = FALSE 
           WHERE id = ?`,
          [conversation_id]
        );
      }

      const [notificationResult] = await connection.execute<ResultSetHeader>(
        "INSERT INTO notifications (user_id, type, sender_id, is_read, created_at) VALUES (?, 'message', ?, 0, NOW())",
        [receiver_id, sender_id]
      );
    }

    io.to(`conversation_${conversation_id}`).emit("newMessage", newMessage);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

router.get("/:conversationId", authenticate, async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user?.userId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    if (isNaN(limit) || isNaN(offset)) {
      throw new Error("Invalid limit or offset value");
    }
    const connection = await connectionPromise;

    const [messages] = await connection.execute<RowDataPacket[]>(
      `SELECT * FROM messages WHERE conversation_id = ? ORDER BY sent_at DESC LIMIT ${limit} OFFSET ${offset}`,
      [Number(conversationId)]
    );

    await connection.execute<ResultSetHeader>(
      `UPDATE conversations
       SET is_read_user1 = CASE WHEN user1_id = ? THEN TRUE ELSE is_read_user1 END,
           is_read_user2 = CASE WHEN user2_id = ? THEN TRUE ELSE is_read_user2 END
       WHERE id = ?`,
      [userId, userId, conversationId]
    );

    // Get total count of messages for pagination
    const [totalCountResult] = await connection.execute<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM messages WHERE conversation_id = ?",
      [Number(conversationId)]
    );
    const totalCount = totalCountResult[0]?.total || 0;
    const hasMore = page * limit < totalCount;

    res.status(200).json({ messages, hasMore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

router.get(
  "/unread/count",
  authenticate,
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    try {
      const connection = await connectionPromise;
      const [result] = await connection.execute<RowDataPacket[]>(
        `
      SELECT COUNT(*) AS unreadCount
      FROM conversations
      WHERE (user1_id = ? AND is_read_user1 = FALSE)
         OR (user2_id = ? AND is_read_user2 = FALSE)
    `,
        [userId, userId]
      );

      const unreadCount = result[0]?.unreadCount || 0;
      res.status(200).json({ unreadCount });
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
      res.status(500).json({ error: "Failed to fetch unread count" });
    }
  }
);

export default router;

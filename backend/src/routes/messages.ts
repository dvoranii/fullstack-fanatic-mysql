import express, { Request, Response } from "express";
import connectionPromise from "../db/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";
import { io } from "../app";
import { csrfProtection } from "../middleware/csrf";

const router = express.Router();

router.post(
  "/",
  authenticate,
  csrfProtection,
  async (req: Request, res: Response): Promise<void> => {
    const { conversation_id, sender_id, receiver_id, content } = req.body;

    try {
      const connection = await connectionPromise;

      const [blockCheck] = await connection.execute<RowDataPacket[]>(
          `SELECT * FROM blocked_users 
           WHERE (blocker_id = ? AND blocked_id = ?) 
            OR (blocker_id = ? AND blocked_id = ?)`,
        [sender_id, receiver_id, receiver_id, sender_id]
      );

      if (blockCheck.length > 0) {
        res.status(403).json({error: "Message not sent. You cannot communicate with a blocked user."});
        return;
      }

      const [conversation] = await connection.execute<RowDataPacket[]>(
        "SELECT user1_id, user2_id, is_deleted_user1, is_deleted_user2 FROM conversations WHERE id = ?",
        [conversation_id]
      );

      if (conversation.length === 0) {
        res.status(404).json({ error: "Conversation not found" });
        return;
      }

      const { user1_id, user2_id, is_deleted_user1, is_deleted_user2 } =
        conversation[0];

        if (
          (receiver_id === user1_id && is_deleted_user1 === 1) ||
          (receiver_id === user2_id && is_deleted_user2 === 1)
        ) {
          res.status(403).json({
            error: "Message not sent. The recipient has deleted this conversation."
          })
          return;
        }

      if (receiver_id === user1_id && is_deleted_user1) {
        await connection.execute<ResultSetHeader>(
          "UPDATE conversations SET is_deleted_user1 = 0 WHERE id = ?",
          [conversation_id]
        );
      } else if (receiver_id === user2_id && is_deleted_user2) {
        await connection.execute<ResultSetHeader>(
          "UPDATE conversations SET is_deleted_user2 = 0 WHERE id = ?",
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
        sent_at: new Date().toISOString(),
      };

      if (sender_id !== receiver_id) {
        const updateQuery =
          receiver_id === user1_id
            ? "UPDATE conversations SET is_read_user1 = 0 WHERE id = ?"
            : "UPDATE conversations SET is_read_user2 = 0 WHERE id = ?";

        await connection.execute<ResultSetHeader>(updateQuery, [
          conversation_id,
        ]);

        await connection.execute<ResultSetHeader>(
          "INSERT INTO notifications (user_id, type, sender_id, conversation_id, is_read, created_at) VALUES (?, 'message', ?, ?, 0, NOW())",
          [receiver_id, sender_id, conversation_id]
        );

        io.to(`user_${receiver_id}`).emit("newNotification", {
          type: "message",
          sender_id,
          conversation_id,
          content,
          sent_at: newMessage.sent_at,
        });
      }

      io.to(`conversation_${conversation_id}`).emit("newMessage", newMessage);

      res.status(201).json({ message: "Message sent successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to send message" });
    }
  }
);

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

    const query = `
            SELECT 
              m.id, 
              m.conversation_id, 
              m.sender_id, 
              m.receiver_id, 
              m.content, 
              m.sent_at,
              sender.name AS sender_name, 
              sender.profile_picture AS sender_picture,
              receiver.name AS receiver_name, 
              receiver.profile_picture AS receiver_picture
            FROM messages m
            LEFT JOIN users AS sender ON m.sender_id = sender.id
            LEFT JOIN users AS receiver ON m.receiver_id = receiver.id 
            WHERE m.conversation_id = ?
            ORDER BY m.sent_at DESC
            LIMIT ${limit} OFFSET ${offset}
         `;

    // Execute the query
    const [messages] = await connection.execute<RowDataPacket[]>(query, [
      Number(conversationId),
    ]);
    await connection.execute<ResultSetHeader>(
      `UPDATE conversations
       SET is_read_user1 = CASE WHEN user1_id = ? THEN 1 ELSE is_read_user1 END,
           is_read_user2 = CASE WHEN user2_id = ? THEN 1 ELSE is_read_user2 END
       WHERE id = ?`,
      [userId, userId, conversationId]
    );

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

export default router;

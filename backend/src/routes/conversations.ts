import express, { Request, Response } from "express";
import connectionPromise from "../db/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";
import { csrfProtection } from "../middleware/csrf";

const router = express.Router();

router.get(
  "/existing",
  authenticate,
  async (req: Request, res: Response): Promise<void> => {
    const { user1_id, user2_id } = req.query;

    try {
      const connection = await connectionPromise;

      const [existingConversation] = await connection.execute<RowDataPacket[]>(
        "SELECT id FROM conversations WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)",
        [user1_id, user2_id, user2_id, user1_id]
      );

      if (existingConversation.length > 0) {
        res.status(200).json({ exists: true, id: existingConversation[0].id });
        return;
      }

      res.status(200).json({ exists: false });
    } catch (err) {
      console.error("Error checking existing conversation:", err);
      res.status(500).json({ error: "Failed to check conversation" });
    }
  }
);

router.post(
  "/",
  authenticate,
  csrfProtection,
  async (req: Request, res: Response) => {
    const { user1_id, user2_id, subject = "No subject" } = req.body;

    try {
      const connection = await connectionPromise;

      const [blockCheck] = await connection.execute<RowDataPacket[]>(
        `SELECT * FROM blocked_users
         WHERE (blocker_id = ? AND blocked_id = ?)
          OR (blocker_id = ? AND blocked_id = ?)`,
      [user1_id, user2_id, user2_id, user1_id]
      );

      if (blockCheck.length > 0) {
        return res.status(403).json({error: "Cannot create conversations with a blocked user."});
      }

      const [result] = await connection.execute<ResultSetHeader>(
        "INSERT INTO conversations (user1_id, user2_id, subject, created_at, is_read_user1, is_read_user2) VALUES (?, ?, ?, NOW(), TRUE, FALSE)",
        [user1_id, user2_id, subject]
      );

      res.status(201).json({ id: result.insertId });
    } catch (err) {
      console.error("Error creating conversation:", err);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  }
);

router.get(
  "/:conversationId",
  authenticate,
  async (req: Request, res: Response): Promise<void> => {
    const { conversationId } = req.params;
    const userId = req.user?.userId;

    try {
      const connection = await connectionPromise;

      const [conversation] = await connection.execute<RowDataPacket[]>(
        `
        SELECT 
          c.*, 
          u1.name AS user1_name, 
          u2.name AS user2_name
        FROM conversations c
        LEFT JOIN users u1 ON c.user1_id = u1.id
        LEFT JOIN users u2 ON c.user2_id = u2.id
        WHERE c.id = ?
        `,
        [conversationId]
      );

      if (conversation.length === 0) {
        res.status(404).json({ error: "Conversation not found" });
        return;
      }

      await connection.execute<ResultSetHeader>(
        "UPDATE conversations SET is_read_user1 = CASE WHEN user1_id = ? THEN TRUE ELSE is_read_user1 END, is_read_user2 = CASE WHEN user2_id = ? THEN TRUE ELSE is_read_user2 END WHERE id = ?",
        [userId, userId, conversationId]
      );

      res.status(200).json(conversation[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  }
);

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

router.patch(
  "/:conversationId/read",
  authenticate,
  csrfProtection,
  async (req: Request, res: Response): Promise<void> => {
    const { conversationId } = req.params;
    const userId = req.user?.userId;

    try {
      const connection = await connectionPromise;

      const [conversation] = await connection.execute<RowDataPacket[]>(
        "SELECT user1_id, user2_id FROM conversations WHERE id = ?",
        [conversationId]
      );

      if (conversation.length === 0) {
        res.status(404).json({ error: "Conversation not found" });
        return;
      }

      const { user1_id, user2_id } = conversation[0];

      if (userId === user1_id) {
        await connection.execute<ResultSetHeader>(
          "UPDATE conversations SET is_read_user1 = 1 WHERE id = ?",
          [conversationId]
        );
      } else if (userId === user2_id) {
        await connection.execute<ResultSetHeader>(
          "UPDATE conversations SET is_read_user2 = 1 WHERE id = ?",
          [conversationId]
        );
      } else {
        res
          .status(403)
          .json({ error: "You are not part of this conversation" });
        return;
      }

      res.status(200).json({ message: "Conversation marked as read" });
    } catch (err) {
      console.error("Failed to update conversation status:", err);
      res.status(500).json({ error: "Failed to mark conversation as read" });
    }
  }
);

router.get(
  "/",
  authenticate,
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    try {
      const connection = await connectionPromise;

      const [conversations] = await connection.execute<RowDataPacket[]>(
        `
        SELECT 
          conversations.*, 
          u1.name AS user1_name, 
          u1.profile_picture AS user1_picture, 
          u2.name AS user2_name, 
          u2.profile_picture AS user2_picture, 
          (SELECT MAX(sent_at) 
           FROM messages 
           WHERE messages.conversation_id = conversations.id) AS last_message_at 
        FROM conversations 
        LEFT JOIN users u1 ON conversations.user1_id = u1.id 
        LEFT JOIN users u2 ON conversations.user2_id = u2.id 
        WHERE 
          (user1_id = ? AND is_deleted_user1 = 0) 
          OR (user2_id = ? AND is_deleted_user2 = 0)
        ORDER BY last_message_at DESC
        `,
        [userId, userId]
      );

      res.status(200).json(conversations);
    } catch (err) {
      console.error("Error fetching conversations:", err);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  }
);

router.delete(
  "/:conversationId",
  authenticate,
  csrfProtection,
  async (req: Request, res: Response): Promise<void> => {
    const { conversationId } = req.params;
    const userId = req.user?.userId;

    try {
      const connection = await connectionPromise;

      const [conversation] = await connection.execute<RowDataPacket[]>(
        "SELECT user1_id, user2_id FROM conversations WHERE id = ?",
        [conversationId]
      );

      if (conversation.length === 0) {
        res.status(404).json({ error: "Conversation not found" });
        return;
      }

      const { user1_id, user2_id } = conversation[0];

      if (userId !== user1_id && userId !== user2_id) {
        res
          .status(403)
          .json({ error: "You are not part of this conversation" });
        return;
      }

      if (userId === user1_id) {
        await connection.execute<ResultSetHeader>(
          "UPDATE conversations SET is_deleted_user1 = 1 WHERE id = ?",
          [conversationId]
        );
      } else if (userId === user2_id) {
        await connection.execute<ResultSetHeader>(
          "UPDATE conversations SET is_deleted_user2 = 1 WHERE id = ?",
          [conversationId]
        );
      }

      const [updatedConversation] = await connection.execute<RowDataPacket[]>(
        "SELECT is_deleted_user1, is_deleted_user2 FROM conversations WHERE id = ?",
        [conversationId]
      );

      if (
        updatedConversation[0].is_deleted_user1 &&
        updatedConversation[0].is_deleted_user2
      ) {
        await connection.execute<ResultSetHeader>(
          "DELETE FROM conversations WHERE id = ?",
          [conversationId]
        );
      }

      res
        .status(200)
        .json({ message: "Conversation deleted for current user" });
    } catch (err) {
      console.error("Failed to delete conversation:", err);
      res.status(500).json({ error: "Failed to delete conversation" });
    }
  }
);

export default router;

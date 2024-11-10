import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.get("/existing", authenticate, async (req: Request, res: Response) => {
  const { user1_id, user2_id } = req.query;

  try {
    const connection = await connectionPromise;

    const [existingConversation] = await connection.execute<RowDataPacket[]>(
      "SELECT id FROM conversations WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)",
      [user1_id, user2_id, user2_id, user1_id]
    );

    if (existingConversation.length > 0) {
      return res
        .status(200)
        .json({ exists: true, id: existingConversation[0].id });
    }

    res.status(200).json({ exists: false });
  } catch (err) {
    console.error("Error checking existing conversation:", err);
    res.status(500).json({ error: "Failed to check conversation" });
  }
});

router.post("/", authenticate, async (req: Request, res: Response) => {
  const { user1_id, user2_id, subject = "No subject" } = req.body;

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
      "INSERT INTO conversations (user1_id, user2_id, subject, created_at) VALUES (?, ?, ?, NOW())",
      [user1_id, user2_id, subject]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error("Error creating conversation:", err);
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

router.get(
  "/:conversationId",
  authenticate,
  async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const userId = req.user?.userId;

    try {
      const connection = await connectionPromise;

      const [conversation] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM conversations WHERE id = ?",
        [conversationId]
      );

      if (conversation.length === 0) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      await connection.execute<ResultSetHeader>(
        "UPDATE conversations SET is_read = true WHERE id = ? AND (user1_id = ? OR user2_id = ?)",
        [conversationId, userId, userId]
      );

      res.status(200).json(conversation[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  }
);

router.patch(
  "/:conversationId/read",
  authenticate,
  async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const userId = req.user?.userId;

    try {
      const connection = await connectionPromise;

      // Update the conversation's is_read status to true (1)
      await connection.execute<ResultSetHeader>(
        "UPDATE conversations SET is_read = 1 WHERE id = ? AND (user1_id = ? OR user2_id = ?)",
        [conversationId, userId, userId]
      );

      res.status(200).json({ message: "Conversation marked as read" });
    } catch (err) {
      console.error("Failed to update conversation status:", err);
      res.status(500).json({ error: "Failed to mark conversation as read" });
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
         WHERE (user1_id = ? AND is_deleted_user1 = 0) 
            OR (user2_id = ? AND is_deleted_user2 = 0)`,
      [userId, userId]
    );

    res.status(200).json(conversations);
  } catch (err) {
    console.error("Error fetching conversations:", err);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});

router.delete(
  "/:conversationId",
  authenticate,
  async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const userId = req.user?.userId;

    try {
      const connection = await connectionPromise;

      // Determine which user is deleting the conversation
      const [conversation] = await connection.execute<RowDataPacket[]>(
        "SELECT user1_id, user2_id FROM conversations WHERE id = ?",
        [conversationId]
      );

      if (conversation.length === 0) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      const { user1_id, user2_id } = conversation[0];

      if (userId !== user1_id && userId !== user2_id) {
        return res
          .status(403)
          .json({ error: "You are not part of this conversation" });
      }

      // Update the appropriate is_deleted flag based on which user is deleting
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

      // Check if both users have deleted the conversation
      const [updatedConversation] = await connection.execute<RowDataPacket[]>(
        "SELECT is_deleted_user1, is_deleted_user2 FROM conversations WHERE id = ?",
        [conversationId]
      );

      if (
        updatedConversation[0].is_deleted_user1 &&
        updatedConversation[0].is_deleted_user2
      ) {
        // If both users have deleted the conversation, remove it completely
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

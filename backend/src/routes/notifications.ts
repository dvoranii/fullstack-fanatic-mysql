import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { authenticate } from "../middleware/authenticate";
import { RowDataPacket } from "mysql2";
import { csrfProtection } from "../middleware/csrf";

const router = express.Router();

router.get("/", authenticate, async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  if (!userId) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const connection = await connectionPromise;

    const [notifications] = await connection.query<RowDataPacket[]>(
      `
      SELECT n.*, u.name as sender_name, u.profile_picture as sender_profile_picture, u.id as sender_id,
             c.id as comment_id, c.parent_comment_id, c.content_id, c.content_type
      FROM notifications n
      LEFT JOIN users u ON n.sender_id = u.id
      LEFT JOIN comments c ON n.comment_id = c.id
      WHERE n.user_id = ?
      ORDER BY n.created_at DESC
      LIMIT ? OFFSET ?
    `,
      [userId, limit, offset]
    );

    const [totalCountResult] = await connection.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM notifications WHERE user_id = ?",
      [userId]
    );
    const totalCount = totalCountResult[0]?.total || 0;
    const hasMore = page * limit < totalCount;

    res.status(200).json({ notifications, hasMore });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.patch(
  "/:id/read",
  authenticate,
  csrfProtection,
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const notificationId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
      const connection = await connectionPromise;
      await connection.execute(
        "UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?",
        [notificationId, userId]
      );

      res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
      console.error("Error updating notification:", error);
      res.status(500).json({ error: "Failed to update notification" });
    }
  }
);

router.get(
  "/unread/count",
  authenticate,
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
      const connection = await connectionPromise;

      const [result] = await connection.query<RowDataPacket[]>(
        `SELECT COUNT(*) AS unreadCount
       FROM notifications
       WHERE user_id = ? AND is_read = FALSE`,
        [userId]
      );

      const unreadCount = result[0]?.unreadCount || 0;
      res.status(200).json({ unreadCount });
    } catch (error) {
      console.error("Error fetching unread notifications count:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch unread notifications count" });
    }
  }
);

export default router;

import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { authenticate } from "../middleware/authenticate";
import { RowDataPacket } from "mysql2";

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
      `SELECT n.*, u.name as sender_name, u.profile_picture as sender_profile_picture, u.id as sender_id
         FROM notifications n
         JOIN users u ON n.sender_id = u.id
         WHERE n.user_id = ?
         ORDER BY n.created_at DESC
         LIMIT ? OFFSET ?`,
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

router.patch("/:id/read", authenticate, async (req: Request, res: Response) => {
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
});

export default router;

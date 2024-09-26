import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

// Fetch notifications for the logged-in user
router.get("/", authenticate, async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const connection = await connectionPromise;
    const [notifications] = await connection.execute(
      "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Mark a notification as read
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

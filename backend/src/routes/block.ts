import express, {Request, Response} from "express";
import connectionPromise from "../db/db";
import {RowDataPacket} from "mysql2";
import { csrfProtection } from "../middleware/csrf";
import { authenticate } from "../middleware/authenticate";
import { executeBlockActions, executeUnblockActions } from "../services/blockEffectsService";

const router = express.Router();

router.post("/:userId", authenticate, csrfProtection, async (req: Request, res: Response): Promise<void> => {
    try {

        const {userId} = req.params;
        const currentUserId = req.user?.userId;

        if (!currentUserId) {
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        if (parseInt(userId) === currentUserId) {
            res.status(400).json({error: "You cannot block yourself"});
            return;
        }

        const connection = await connectionPromise;

        const [userExists] = await connection.execute<RowDataPacket[]>(
            "SELECT id FROM users WHERE id = ?",
            [userId]
        );

        if (userExists.length === 0) {
            res.status(404).json({error: "User not found"});
        }

        const [alreadyBlocked] = await connection.execute<RowDataPacket[]>(
            "SELECT * FROM blocked_users WHERE blocker_id = ? AND blocked_id = ?",
            [currentUserId, userId]
        );

        if (alreadyBlocked.length > 0) {
            res.status(400).json({error: "User is already blocked"});
        }


        await connection.execute(
        "INSERT INTO blocked_users (blocker_id, blocked_id) VALUES (?, ?)",
        [currentUserId, userId]
      );

      await executeBlockActions(currentUserId, parseInt(userId));

      res.status(200).json({ message: "User blocked successfully" });

    } catch (error) {
        console.error("Error blocking user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post("/unblock/:userId", authenticate, csrfProtection, async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user?.userId;

        if (!currentUserId) {
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        const connection = await connectionPromise;

        const [result] = await connection.execute<RowDataPacket[]>(
            "DELETE FROM blocked_users WHERE blocker_id = ? AND blocked_id = ?",
            [currentUserId, userId]
        )

        if ((result as any).affectedRows === 0) {
            res.status(404).json({error: "Block relationship not found"});
            return;
        }

        await executeUnblockActions(currentUserId, parseInt(userId));

        res.status(200).json({messaage: "user unblocked successfully"});
    } catch (error) {
        console.error("Error unblocking user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get("/is-blocked/:userId", authenticate, async (req: Request, res: Response): Promise<void> => {
    try {
        const {userId} = req.params;
        const currentUserId = req.user?.userId;

        if (!currentUserId) {
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        const connection = await connectionPromise;

        const [blockStatus] = await connection.execute<RowDataPacket[]>(
            "SELECT * FROM blocked_users WHERE blocker_id = ? AND blocked_id = ?",
            [currentUserId, userId]
        );

        res.status(200).json({
            isBlocked: blockStatus.length > 0
        });

    } catch(error) {
        console.error("Error checking block status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get(
    "/blocked",
    authenticate,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const currentUserId = req.user?.userId;
  
        if (!currentUserId) {
          res.status(401).json({ error: "Unauthorized" });
          return;
        }
  
        const connection = await connectionPromise;

        const [blockedUsers] = await connection.execute<RowDataPacket[]>(
          `SELECT u.id, u.name, u.profile_picture, u.profession 
           FROM users u
           JOIN blocked_users b ON u.id = b.blocked_id
           WHERE b.blocker_id = ?`,
          [currentUserId]
        );
  
        res.status(200).json({ users: blockedUsers });
      } catch (error) {
        console.error("Error fetching blocked users:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

export default router;
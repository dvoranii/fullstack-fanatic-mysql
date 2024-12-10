import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.get(
  "/search-users",
  authenticate,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { searchQuery, filter } = req.query;

      if (!searchQuery || typeof searchQuery !== "string") {
        res
          .status(400)
          .json({ error: "Search query is required and must be a string" });
        return;
      }

      if (filter !== "name" && filter !== "profession") {
        res
          .status(400)
          .json({ error: "Filter must be 'name' or 'profession'" });
        return;
      }

      const connection = await connectionPromise;
      const query = `
        SELECT id, name, profile_picture, profession 
        FROM users 
        WHERE LOWER(${filter}) LIKE LOWER(?)
      `;
      const searchPattern = `%${searchQuery}%`;

      const [users] = await connection.execute<RowDataPacket[]>(query, [
        searchPattern,
      ]);

      if (users.length === 0) {
        res.status(404).json({ message: "No users found" });
        return;
      }

      res.status(200).json({ users });
    } catch (error) {
      console.error("Error searching for users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;

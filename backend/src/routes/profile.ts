import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import connectionPromise from "../db";
import { RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

// Setup Multer for image uploads
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, path.join(__dirname, "../../public/assets/images"));
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Route to upload profile banner
router.post(
  "/upload-profile",
  authenticate,
  upload.single("bannerimage"),
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const bannerImagePath = `/assets/images/${req.file.filename}`;

    try {
      const connection = await connectionPromise;
      await connection.execute(
        "UPDATE users SET banner_image = ? WHERE id = ?",
        [bannerImagePath, userId]
      );

      res.status(200).json({
        message: "Profile banner updated successfully",
        bannerImagePath,
      });
    } catch (error) {
      console.error("Error updating profile banner: ", error);
      res.status(500).json({ error: "Failed to update profile banner" });
    }
  }
);

// Route to update user profile
router.put(
  "/update-profile",
  authenticate,
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { displayName, profession, bio, socialLinks } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const connection = await connectionPromise;
      await connection.execute(
        `UPDATE users SET display_name = ?, profession = ?, bio = ?, social_links = ? WHERE id = ?`,
        [displayName, profession, bio, JSON.stringify(socialLinks), userId]
      );

      const [user] = await connection.query<RowDataPacket[]>(
        "SELECT id, email, name, display_name, profession, bio, social_links, profile_picture AS picture, banner_image FROM users WHERE id = ?",
        [userId]
      );

      if (!user.length) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user[0]);
    } catch (error) {
      console.error("Failed to update user profile: ", error);
      res.status(500).json({ error: "Failed to update user profile" });
    }
  }
);

// Route to fetch user profile
router.get("/profile", authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const connection = await connectionPromise;
    const [user] = await connection.query<RowDataPacket[]>(
      "SELECT id, email, name, display_name, profession, bio, social_links, profile_picture AS picture, banner_image FROM users WHERE id = ?",
      [userId]
    );

    if (!user.length) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user[0]);
  } catch (error) {
    console.error("Failed to fetch user profile: ", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

export default router;

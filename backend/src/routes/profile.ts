import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import connectionPromise from "../db";
import { RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.get("/profile", authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const connection = await connectionPromise;
    const [user] = await connection.query<RowDataPacket[]>(
      "SELECT id, email, name, display_name, profession, bio, social_links, profile_picture , banner_image FROM users WHERE id = ?",
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

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    let destinationPath = path.join(__dirname, "../../public/assets/images");

    if (file.fieldname === "bannerimage") {
      destinationPath = path.join(destinationPath, "banners");
    } else if (file.fieldname === "profile_picture") {
      destinationPath = path.join(destinationPath, "profilePictures");
    }

    cb(null, destinationPath);
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

router.post(
  "/upload-banner",
  authenticate,
  upload.single("bannerimage"),
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const bannerImagePath = `/assets/images/banners/${req.file.filename}`;

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

router.post(
  "/upload-profile-picture",
  authenticate,
  upload.single("profile_picture"),
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profilePicturePath = `/assets/images/profilePictures/${req.file.filename}`;

    try {
      const connection = await connectionPromise;
      await connection.execute(
        "UPDATE users SET profile_picture = ? WHERE id = ?",
        [profilePicturePath, userId]
      );

      res.status(200).json({
        message: "Profile picture updated successfully",
        profilePicturePath,
      });
    } catch (error) {
      console.error("Error updating profile picture: ", error);
      res.status(500).json({ error: "Failed to update profile picture" });
    }
  }
);

router.put(
  "/update-profile",
  authenticate,
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { display_name, profession, bio, social_links } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const connection = await connectionPromise;

      const [currentUser] = await connection.query<RowDataPacket[]>(
        "SELECT display_name, profession, bio, social_links FROM users WHERE id = ?",
        [userId]
      );
      const userInfo = currentUser[0];

      const safeDisplayName =
        display_name !== undefined ? display_name : userInfo.display_name;
      const safeProfession =
        profession !== undefined ? profession : userInfo.profession;
      const safeBio = bio !== undefined ? bio : userInfo.bio;
      const safeSocialLinks =
        social_links !== undefined
          ? JSON.stringify(social_links)
          : userInfo.social_links;

      // Update user profile in the database
      const [updateResult] = await connection.execute(
        `UPDATE users SET display_name = ?, profession = ?, bio = ?, social_links = ? WHERE id = ?`,
        [safeDisplayName, safeProfession, safeBio, safeSocialLinks, userId]
      );

      const [user] = await connection.query<RowDataPacket[]>(
        "SELECT id, email, name, display_name, profession, bio, social_links, profile_picture, banner_image FROM users WHERE id = ?",
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

router.delete(
  "/social-link/:platform",
  authenticate,
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { platform } = req.params;

    console.log("User ID:", userId, "Platform:", platform);

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const connection = await connectionPromise;

      // Begin transaction
      await connection.beginTransaction();

      const [currentUser] = await connection.query<RowDataPacket[]>(
        "SELECT social_links FROM users WHERE id = ?",
        [userId]
      );

      if (!currentUser.length) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log("Raw social_links data:", currentUser[0].social_links);

      let socialLinks;
      try {
        if (typeof currentUser[0].social_links === "string") {
          socialLinks = JSON.parse(currentUser[0].social_links || "{}");
        } else {
          socialLinks = currentUser[0].social_links || {};
        }
      } catch (parseError) {
        console.error("Error parsing social links JSON:", parseError);
        await connection.rollback();
        return res.status(500).json({ error: "Failed to parse social links" });
      }

      delete socialLinks[platform];

      const sqlQuery = `UPDATE users SET social_links = '${JSON.stringify(
        socialLinks
      )}' WHERE id = ${userId}`;

      const [updateResult] = await connection.execute(
        "UPDATE users SET social_links = ? WHERE id = ?",
        [JSON.stringify(socialLinks), userId]
      );

      await connection.commit();

      const [updatedUser] = await connection.query<RowDataPacket[]>(
        "SELECT social_links FROM users WHERE id = ?",
        [userId]
      );

      res.status(200).json({ message: "Social link deleted successfully" });
    } catch (error) {
      console.error("Error deleting social link:", error);
      res.status(500).json({ error: "Failed to delete social link" });
    }
  }
);

export default router;

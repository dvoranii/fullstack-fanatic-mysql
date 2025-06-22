import express, { Request, Response } from "express";
import connectionPromise from "../db/db";
import { RowDataPacket } from "mysql2";
import { authenticate } from "../middleware/authenticate";
import { upload } from "../utils/storageConfig";
import { csrfProtection } from "../middleware/csrf";
import { s3 } from "../utils/storageConfig";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

const router = express.Router();

interface S3File extends Express.Multer.File {
  location: string;
}
interface CustomMulterRequest extends Request {
  file?: S3File;
  user?: {
    userId: number;
    googleId: string;
    email: string;
    name: string;
  };
}

router.get(
  "/",
  authenticate,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      const connection = await connectionPromise;
      const [user] = await connection.query<RowDataPacket[]>(
        "SELECT id, email, name, display_name, profession, bio, social_links, profile_picture , banner_image, isPremium, premiumLevel, subscription_cancellation_date FROM users WHERE id = ?",
        [userId]
      );

      if (!user.length) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json(user[0]);
    } catch (error) {
      console.error("Failed to fetch user profile: ", error);
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  }
);

router.post(
  "/upload-banner",
  authenticate,
  csrfProtection,
  upload.single("bannerimage"),
  async (req: Request, res: Response) => {
    const userId = (req as CustomMulterRequest).user?.userId;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file as S3File;
    const bannerImageUrl: string = file.location;
    const connection = await connectionPromise;

    try {
      const [currentUser] = await connection.query<RowDataPacket[]>(
        "SELECT banner_image FROM users WHERE id = ?",
        [userId]
      );

      const oldBannerImageUrl: string | null =
        currentUser[0]?.banner_image || null;

      const bucketName = process.env.BUCKET_NAME;
      const oldBannerImageKey = oldBannerImageUrl
        ? oldBannerImageUrl.split(
            `https://${bucketName}.tor1.digitaloceanspaces.com/`
          )[1]
        : null;

      if (oldBannerImageKey) {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME!,
            Key: oldBannerImageKey,
          })
        );
      }

      await connection.execute(
        "UPDATE users SET banner_image = ? WHERE id = ?",
        [bannerImageUrl, userId]
      );

      res.status(200).json({
        message: "Profile banner updated successfully",
        imageUrl: bannerImageUrl,
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
  csrfProtection,
  upload.single("profile_picture"),
  async (req: Request, res: Response) => {
    const userId = (req as CustomMulterRequest).user?.userId;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file as S3File;
    const profilePictureUrl: string = file.location;
    const connection = await connectionPromise;

    try {
      const [currentUser] = await connection.query<RowDataPacket[]>(
        "SELECT profile_picture FROM users WHERE id = ?",
        [userId]
      );

      const oldProfilePictureUrl: string | null =
        currentUser[0]?.profile_picture || null;

      const extractKeyFromUrl = (url: string) => {
        const bucketName = process.env.BUCKET_NAME;
        const base = `https://${bucketName}.tor1.digitaloceanspaces.com/`;
        return url.startsWith(base) ? url.replace(base, "") : null;
      };

      const oldProfilePictureKey = oldProfilePictureUrl
        ? extractKeyFromUrl(oldProfilePictureUrl)
        : null;

      console.log("Old Profile Picture Key:", oldProfilePictureKey);
      if (oldProfilePictureKey) {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME!,
            Key: oldProfilePictureKey,
          })
        );
      }

      await connection.execute(
        "UPDATE users SET profile_picture = ? WHERE id = ?",
        [profilePictureUrl, userId]
      );

      console.log(profilePictureUrl);
      res.status(200).json({
        message: "Profile picture updated successfully",
        imageUrl: profilePictureUrl,
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
  csrfProtection,
  upload.none(),
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const { display_name, profession, bio, social_links } = req.body;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
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
          ? JSON.stringify(JSON.parse(social_links))
          : userInfo.social_links;

      await connection.execute(
        `UPDATE users SET display_name = ?, profession = ?, bio = ?, social_links = ? WHERE id = ?`,
        [safeDisplayName, safeProfession, safeBio, safeSocialLinks, userId]
      );

      const [user] = await connection.query<RowDataPacket[]>(
        "SELECT id, email, name, display_name, profession, bio, social_links, profile_picture, banner_image, isPremium, premiumLevel FROM users WHERE id = ?",
        [userId]
      );

      if (!user.length) {
        res.status(404).json({ message: "User not found" });
        return;
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
  csrfProtection,
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const { platform } = req.params;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    let connection;
    try {
      connection = await connectionPromise.getConnection();

      await connection.beginTransaction();

      const [currentUser] = await connection.query<RowDataPacket[]>(
        "SELECT social_links FROM users WHERE id = ?",
        [userId]
      );

      if (!currentUser.length) {
        await connection.release();
        res.status(404).json({ message: "User not found" });
        return;
      }

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
        res.status(500).json({ error: "Failed to parse social links" });
        return;
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

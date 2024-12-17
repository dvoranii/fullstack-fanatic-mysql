import express, { Request, Response } from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import connectionPromise from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import dotenv from "dotenv";
import { fetchUserByColumn, insertUser } from "../utils/userUtils";
import {
  createJwtToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/jwtUtils";
import bcrypt from "bcrypt";
import { authenticate } from "../middleware/authenticate";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { csrfProtection } from "../middleware/csrf";
import { verifyRecaptchaToken } from "../utils/recaptchaUtils";

dotenv.config();

const router = express.Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { email, name, password } = req.body;

  const defaultProfilePicture = "/assets/images/profile-icon.png";

  try {
    const connection = await connectionPromise;
    const [existingUserByEmail] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUserByEmail.length > 0) {
      console.log("User already exists");
      res.status(409).json({ message: "User with this email already exists" });
      return;
    }

    const [existingUserByName] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE name = ?",
      [name]
    );

    if (existingUserByName.length > 0) {
      console.log("Username already exists");
      res.status(409).json({ message: "Username already taken" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [results] = await connection.execute<ResultSetHeader>(
      "INSERT INTO users (email, name, password, auth_type, profile_picture) VALUES (?, ?, ?, ?, ?)",
      [email, name, hashedPassword, "manual", defaultProfilePicture]
    );

    res
      .status(201)
      .json({ message: "User created successfully", userId: results.insertId });
  } catch (err) {
    const error = err as Error;
    console.error("Error inserting user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const connection = await connectionPromise;
    const [results] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE name = ? AND auth_type = 'manual'",
      [username]
    );

    if (results.length === 0) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const user = results[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const jwtToken = createJwtToken(user.id, user.name);
    const refreshToken = createRefreshToken(user.id, user.name);

    // Set refresh token in HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/users/refresh-token",
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: { id: user.id, username: user.username, name: user.name },
      token: jwtToken, // Send access token in response
    });
  } catch (err) {
    const error = err as Error;
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/users/refresh-token",
  });
  res.status(200).json({ message: "Logged Out" });
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const { google_id } = req.query;

  if (typeof google_id !== "string") {
    res.status(400).json({ error: "Invalid google_id" });
    return;
  }

  try {
    const connection = await connectionPromise;
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT id AS user_id FROM users WHERE google_id = ?",
      [google_id]
    );

    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

router.post(
  "/google-register",
  csrfProtection,
  async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ error: "Token is required" });
      return;
    }

    try {
      const googleUserInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!googleUserInfoResponse.ok) {
        throw new Error("Failed to fetch user info from Google");
      }

      const googleUserInfo = await googleUserInfoResponse.json();
      const {
        email,
        name,
        id: googleId,
        picture: googleProfilePicture,
      } = googleUserInfo;

      const existingUser = await fetchUserByColumn("google_id", googleId);

      if (existingUser.length > 0) {
        res.status(409).json({ message: "User already exists" });
        return;
      }

      const userId = await insertUser(
        email ?? null,
        name ?? null,
        googleId ?? null,
        null,
        "google",
        googleProfilePicture ?? null
      );

      const jwtToken = createJwtToken(userId, email, googleId);
      const refreshToken = createRefreshToken(userId, email, googleId);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/users/refresh-token",
      });

      res.status(201).json({
        message: "Registration successful",
        accessToken: jwtToken,
        user: {
          userId,
          email,
          name,
          googleId,
          profile_picture: googleProfilePicture,
        },
      });
    } catch (error) {
      console.error("Error during Google registration: ", error);
      res.status(500).json({ error: "Failed to register with Google" });
    }
  }
);

router.post(
  "/google-login",
  csrfProtection,
  async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ error: "Token is required" });
      return;
    }

    try {
      const googleUserInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!googleUserInfoResponse.ok) {
        throw new Error("Failed to fetch user info from Google");
      }

      const googleUserInfo = await googleUserInfoResponse.json();
      const { email, id: googleId } = googleUserInfo;

      const existingUser = await fetchUserByColumn("google_id", googleId);

      if (existingUser.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const userId = existingUser[0].id;

      const jwtToken = createJwtToken(userId, email, googleId);
      const refreshToken = createRefreshToken(userId, email, googleId);

      // Set refresh token in HttpOnly cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/users/refresh-token",
      });

      res.status(200).json({
        message: "Login successful",
        accessToken: jwtToken,
        user: {
          userId,
          email,
          googleId,
          profile_picture: existingUser[0].profile_picture,
        },
      });
    } catch (error) {
      console.error("Error during Google login: ", error);
      res.status(500).json({ error: "Failed to log in with Google" });
    }
  }
);

router.post(
  "/refresh-token",
  async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ error: "Refresh token is required" });
      return;
    }

    try {
      const payload = verifyRefreshToken(refreshToken);
      const newJwtToken = createJwtToken(
        payload.userId,
        payload.email,
        payload.googleId || undefined
      );

      res.status(200).json({ token: newJwtToken });
    } catch (error) {
      console.error("Error verifying refresh token:", error);
      res.status(401).json({ error: "Invalid refresh token" });
    }
  }
);

router.get(
  "/user-profile/:id",
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const connection = await connectionPromise;
      const [user] = await connection.query<RowDataPacket[]>(
        "Select id, email, name, profile_picture, banner_image, profession, social_links, bio FROM users WHERE id = ?",
        [id]
      );

      if (!user.length) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const [favouriteTutorials] = await connection.query<RowDataPacket[]>(
        `SELECT t.* from tutorials t 
      JOIN favourites f ON t.id = f.item_id 
      WHERE f.user_id = ? AND f.content_type = 'tutorial'`,
        [id]
      );

      const [favouriteBlogs] = await connection.query<RowDataPacket[]>(
        `SELECT b.* FROM blogs b
       JOIN favourites f ON b.id = f.item_id
       WHERE f.user_id = ? AND f.content_type = 'blog'`,
        [id]
      );

      res.json({
        user: user[0],
        favouriteTutorials,
        favouriteBlogs,
      });
    } catch (error) {
      console.error("Failed to load user page: ", error);
      res.status(500).json({ error: "Failed to fetch public profile" });
    }
  }
);

router.post(
  "/:id/follow",
  authenticate,
  csrfProtection,
  async (req: Request, res: Response): Promise<void> => {
    const followerId = req.user?.userId;
    const followedId = parseInt(req.params.id);

    if (!followerId || !followedId) {
      res.status(400).json({ message: "Invalid user IDs" });
      return;
    }

    try {
      const connection = await connectionPromise;
      await connection.execute(
        "INSERT INTO followers (follower_id, followed_id) VALUES (?, ?)",
        [followerId, followedId]
      );

      if (followerId !== followedId) {
        await connection.execute(
          "INSERT INTO notifications (user_id, type, sender_id, is_read, created_at) VALUES (?, 'follow', ?, 0, NOW())",
          [followedId, followerId]
        );
      }

      res.status(200).json({ message: "User followed successfully" });
    } catch (error: unknown) {
      if (error instanceof Error && "code" in error) {
        const sqlError = error as { code: string };
        if (sqlError.code === "ER_DUP_ENTRY") {
          res.status(409).json({ message: "Already following this user" });
          return;
        }
      }

      console.error("Error following user: ", error);
      res.status(500).json({ error: "Failed to follow user" });
    }
  }
);

router.delete(
  "/:id/follow",
  authenticate,
  async (req: Request, res: Response): Promise<void> => {
    const followerId = req.user?.userId;
    const followedId = parseInt(req.params.id);

    if (!followerId || !followedId) {
      res.status(400).json({ message: "Invalid user IDs" });
      return;
    }

    try {
      const connection = await connectionPromise;
      await connection.execute(
        "DELETE FROM followers WHERE follower_id = ? AND followed_id = ?",
        [followerId, followedId]
      );

      res.status(200).json({ message: "User unfollowed successfully" });
    } catch (error) {
      console.error("Error unfollowing user: ", error);
      res.status(500).json({ error: "Failed to unfollow user" });
    }
  }
);

router.get(
  "/:id/followers",
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const followerId = getUserIdFromToken(req.headers.authorization);

    try {
      const connection = await connectionPromise;

      const [countRows] = await connection.query<RowDataPacket[]>(
        `SELECT COUNT(*) as followersCount FROM followers WHERE followed_id = ?`,
        [id]
      );

      const followersCount = countRows[0]?.followersCount || 0;
      let isFollowing = false;

      if (followerId) {
        const [isFollowingResult] = await connection.execute<RowDataPacket[]>(
          "SELECT COUNT(*) AS isFollowing FROM followers WHERE follower_id = ? AND followed_id = ?",
          [followerId, id]
        );
        isFollowing = isFollowingResult[0]?.isFollowing > 0;
      }

      res.status(200).json({ followersCount, isFollowing });
      return;
    } catch (err) {
      console.error("Error fetching follow state:", err);
      res.status(500).json({ error: "Failed to fetch follow state" });
      return;
    }
  }
);

router.get(
  "/:id/following",

  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const connection = await connectionPromise;

      const [followingCountResult] = await connection.execute<RowDataPacket[]>(
        "SELECT COUNT(*) AS followingCount FROM followers WHERE follower_id = ?",
        [id]
      );

      const followingCount = followingCountResult[0].followingCount || 0;

      res.status(200).json({ followingCount });
    } catch (error) {
      console.error("Error fetching following count: ", error);
      res.status(500).json({ message: "Failed to fetch following count" });
    }
  }
);

router.get("/:id/followers-list", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const connection = await connectionPromise;

    const [followers] = await connection.execute<RowDataPacket[]>(
      `SELECT u.id, u.name, u.profile_picture, u.profession
         FROM followers f
         JOIN users u ON f.follower_id = u.id
         WHERE f.followed_id = ?`,
      [id]
    );

    res.status(200).json({ followers });
  } catch (error) {
    console.error("Error fetching followers list: ", error);
    res.status(500).json({ message: "Failed to fetch followers list" });
  }
});

router.get("/:id/following-list", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const connection = await connectionPromise;

    const [following] = await connection.execute<RowDataPacket[]>(
      `SELECT u.id, u.name, u.profile_picture, u.profession
       FROM followers f
       JOIN users u ON f.followed_id = u.id
       WHERE f.follower_id = ?`,
      [id]
    );

    res.status(200).json({ following });
  } catch (error) {
    console.error("Error fetching following list: ", error);
    res.status(500).json({ message: "Failed to fetch following list" });
  }
});

router.get(
  "/auth-type",
  authenticate,
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const connection = await connectionPromise;
      const [rows] = await connection.query<RowDataPacket[]>(
        "SELECT auth_type FROM users WHERE id = ?",
        [userId]
      );

      if (rows.length > 0) {
        const { auth_type } = rows[0];
        res.status(200).json({ auth_type });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching auth type:", error);
      res.status(500).json({ error: "Failed to fetch auth type" });
    }
  }
);

router.post(
  "/auth-type/email",
  async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required." });
      return;
    }

    try {
      const connection = await connectionPromise;
      const [rows] = await connection.execute<RowDataPacket[]>(
        "SELECT auth_type FROM users WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ auth_type: rows[0].auth_type });
    } catch (error) {
      console.error("Error checking auth type by email:", error);
      res.status(500).json({ message: "Failed to fetch auth type." });
    }
  }
);

router.post(
  "/forgot-password",
  csrfProtection,
  async (req: Request, res: Response): Promise<void> => {
    const { email, recaptchaToken } = req.body;

    if (!recaptchaToken) {
      res.status(400).json({ error: "ReCAPTCHA token is required." });
      return;
    }

    const isRecaptchaValid = await verifyRecaptchaToken(recaptchaToken);
    if (!isRecaptchaValid) {
      res.status(400).json({ error: "ReCAPTCHA verification failed." });
      return;
    }

    try {
      const connection = await connectionPromise;
      const [users] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (users.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiry = Date.now() + 3600000;

      await connection.execute(
        "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
        [resetToken, resetTokenExpiry, email]
      );

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        text: `You have requested to reset your password. Please click the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${resetToken}`,
      };

      await transporter.sendMail(mailOptions);

      res
        .status(200)
        .json({ message: "Password reset link sent successfully" });
    } catch (err) {
      console.error("Error sending password reset email:", err);
      res.status(500).json({ error: "Failed to send password reset email" });
    }
  }
);

router.post(
  "/reset-password/:token",
  csrfProtection,
  async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params;
    const { password, recaptchaToken } = req.body;

    if (!recaptchaToken) {
      res.status(400).json({ error: "ReCAPTCHA token is required." });
      return;
    }

    const isRecaptchaValid = await verifyRecaptchaToken(recaptchaToken);
    if (!isRecaptchaValid) {
      res.status(400).json({ error: "ReCAPTCHA verification failed." });
      return;
    }

    try {
      const connection = await connectionPromise;
      const [users] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?",
        [token, Date.now()]
      );

      if (users.length === 0) {
        res.status(400).json({ message: "Invalid or expired token" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await connection.execute(
        "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
        [hashedPassword, users[0].id]
      );

      res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
      console.error("Error resetting password:", err);
      res.status(500).json({ error: "Failed to reset password" });
    }
  }
);

export default router;

import express, { Request, Response } from "express";
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

dotenv.config();

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  console.log("Received registration request:", { email, name, password });

  try {
    const connection = await connectionPromise;
    const [existingUser] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      console.log("User already exists");
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [results] = await connection.execute<ResultSetHeader>(
      "INSERT INTO users (email, name, google_id) VALUES (?, ?, ?)",
      [email, name, hashedPassword, false, "manual"]
    );
    console.log("User inserted with ID:", results.insertId);
    res
      .status(201)
      .json({ message: "User created successfully", userId: results.insertId });
  } catch (err) {
    const error = err as Error;
    console.error("Error inserting user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("Received login request:", { email, password });

  try {
    const connection = await connectionPromise;
    const [results] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ? AND auth_type = 'manual'",
      [email]
    );

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const jwtToken = createJwtToken(user.id, user.email, user.google_id);
    const refreshToken = createRefreshToken(
      user.id,
      user.email,
      user.google_id
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: { id: user.id, email: user.email, name: user.name },
      token: jwtToken,
    });
  } catch (err) {
    const error = err as Error;
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  const { google_id } = req.query;

  if (typeof google_id !== "string") {
    return res.status(400).json({ error: "Invalid google_id" });
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

router.post("/google-auth", async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "token is required" });
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
    const { email, name, id: googleId, picture } = googleUserInfo;

    const existingUser = await fetchUserByColumn("google_id", googleId);

    let userId;
    if (existingUser.length > 0) {
      userId = existingUser[0].id;
    } else {
      userId = await insertUser(email, name, googleId, null, true, "google");
    }

    const jwtToken = createJwtToken(userId, email, googleId);
    const refreshToken = createRefreshToken(userId, email, googleId);

    // dev environment, needs to be changed to work over https
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      message: jwtToken,
      user: { userId, email, name, googleId, picture },
    });
  } catch (error) {
    console.error("Error during Google authentication: ", error);
    res.status(500).json({ error: "Failed to authenticate with Google" });
  }
});

router.post("/refresh-token", async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token is required" });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const newJwtToken = createJwtToken(
      payload.userId,
      payload.email,
      payload.googleId
    );

    res.status(200).json({ token: newJwtToken });
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    res.status(401).json({ error: "Invalid refresh token" });
  }
});

export default router;

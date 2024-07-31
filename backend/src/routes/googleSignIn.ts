import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { GoogleResponse } from "../types/GoogleResponse";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { token } = req.body;
  console.log(token);

  try {
    console.log("Received token:", token);
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to verify token with Google: ${errorText}`);
    }
    const data = (await response.json()) as GoogleResponse;
    console.log("Google response data:", data);
    const { email, name, sub: googleId } = data;

    const connection = await connectionPromise;

    // Check if the user already exists
    const [existingUsers] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE google_id = ?",
      [googleId]
    );

    let user;
    if (existingUsers.length > 0) {
      user = existingUsers[0];
    } else {
      // Insert the new user
      const [result] = await connection.query<ResultSetHeader>(
        "INSERT INTO users (email, name, google_id) VALUES (?, ?, ?)",
        [email, name, googleId]
      );
      const [newUser] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE id = ?",
        [result.insertId]
      );
      user = newUser[0];
    }

    res.json(user);
  } catch (error) {
    console.error("Google Sign In failed", error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
});

export default router;

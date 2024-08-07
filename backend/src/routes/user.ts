import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, name, googleId } = req.body;
  console.log("Received registration request:", { email, name, googleId });

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

    const [results] = await connection.execute<ResultSetHeader>(
      "INSERT INTO users (email, name, google_id) VALUES (?, ?, ?)",
      [email, name, googleId]
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
  const { email, googleId } = req.body;
  console.log("Received login request:", { email, googleId });

  try {
    const connection = await connectionPromise;
    const [results] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ? AND google_id = ?",
      [email, googleId]
    );

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    console.log("User logged in:", results[0]);
    res
      .status(200)
      .json({ message: "User logged in successfully", user: results[0] });
  } catch (err) {
    const error = err as Error;
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Route to get user_id by google_id
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

export default router;

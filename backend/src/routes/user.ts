import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { ResultSetHeader } from "mysql2";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, name, googleId } = req.body;
  console.log("Received registration request:", { email, name, googleId });

  try {
    const connection = await connectionPromise;
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

export default router;

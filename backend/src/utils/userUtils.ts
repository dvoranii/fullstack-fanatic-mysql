import connectionPromise from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const fetchUserByColumn = async (column: string, value: string) => {
  const connection = await connectionPromise;
  const [results] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM users WHERE ${column} = ?`,
    [value]
  );
  return results;
};

export const insertUser = async (
  email: string,
  name: string,
  googleId: string | null, // Nullable in case of manual registration
  password: string | null, // Nullable in case of Google registration
  authType: "google" | "manual", // Enforced to accept only 'google' or 'manual'
  profilePicture: string | null
) => {
  const connection = await connectionPromise;
  const [result] = await connection.execute<ResultSetHeader>(
    "INSERT INTO users (email, name, google_id, password, auth_type, profile_picture) VALUES (?, ?, ?, ?, ?, ?)",
    [email, name, googleId, password, authType, profilePicture]
  );
  return result.insertId;
};

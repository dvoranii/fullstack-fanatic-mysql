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
  googleId: string
) => {
  const connection = await connectionPromise;
  const [result] = await connection.execute<ResultSetHeader>(
    "INSERT INTO users (email, name, google_id) VALUES (?, ?, ?)",
    [email, name, googleId]
  );
  return result.insertId;
};

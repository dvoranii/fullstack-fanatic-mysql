import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const createConnection = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user:
      process.env.NODE_ENV === "production"
        ? "dbuser"
        : process.env.NODE_ENV === "staging"
        ? "staging_user"
        : "root",
    password: process.env.DB_PW,
    database: "tutorials_db",
  });

  console.log("MySQL Connected...");
  return connection;
};

const connection = createConnection();

export default connection;

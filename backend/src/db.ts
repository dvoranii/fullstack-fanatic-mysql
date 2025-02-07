import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
 host: "localhost",
  user: process.env.NODE_ENV === "production"
    ? "dbuser"
    : process.env.NODE_ENV === "staging"
    ? "staging_user"
    : "root",
  password: process.env.DB_PW,
  database: process.env.NODE_ENV === "production"
    ? "tutorials_db"
    : process.env.NODE_ENV === "staging"
    ? "staging_db"
    : "staging_db", 

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

pool.on("connection", () => {
  console.log("MySQL Connected...");
});

export default pool;

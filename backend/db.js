import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PW,
  database: "tutorials_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

export default connection;

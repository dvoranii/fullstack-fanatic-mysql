"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection = mysql2_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PW,
    database: "tutorials_db",
});
connection.connect((err) => {
    if (err)
        throw err;
    console.log("MySQL Connected...");
});
exports.default = connection;

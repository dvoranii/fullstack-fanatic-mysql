"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createConnection = async () => {
    const connection = await promise_1.default.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.DB_PW,
        database: "tutorials_db",
    });
    console.log("MySQL Connected...");
    return connection;
};
const connection = createConnection();
exports.default = connection;

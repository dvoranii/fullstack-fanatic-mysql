"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const { token } = req.body;
    try {
        const response = await (0, node_fetch_1.default)(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
        const data = (await response.json());
        const { email, name, sub: googleId } = data;
        const connection = await db_1.default;
        // Check if the user already exists
        const [existingUsers] = await connection.query("SELECT * FROM users WHERE google_id = ?", [googleId]);
        let user;
        if (existingUsers.length > 0) {
            user = existingUsers[0];
        }
        else {
            // Insert the new user
            const [result] = await connection.query("INSERT INTO users (email, name, google_id) VALUES (?, ?, ?)", [email, name, googleId]);
            const [newUser] = await connection.query("SELECT * FROM users WHERE id = ?", [result.insertId]);
            user = newUser[0];
        }
        res.json(user);
    }
    catch (error) {
        console.error("Google Sign In failed", error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Unknown error" });
        }
    }
});
exports.default = router;

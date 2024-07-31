"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
router.get("/:contentType/:contentId", async (req, res) => {
    const { contentType, contentId } = req.params;
    console.log(`Fetching comments for ${contentType} with ID ${contentId}`);
    try {
        const connection = await db_1.default;
        const [results] = await connection.query("SELECT * FROM comments WHERE content_type = ? AND content_id = ?", [contentType, contentId]);
        res.json(results);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ error: error.message });
    }
});
router.post("/", async (req, res) => {
    const { content_id, content_type, content } = req.body;
    try {
        const connection = await db_1.default;
        const [results] = await connection.query("INSERT INTO comments (content_id, content_type, content) VALUES (?, ?, ?)", [content_id, content_type, content]);
        res.json({ id: results.insertId, content_id, content_type, content });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ error: error.message });
    }
});
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    console.log(`Updating comment with ID ${id}`);
    try {
        const connection = await db_1.default;
        await connection.query("UPDATE comments SET content = ? WHERE id = ?", [content, id]);
        res.json({ id, content });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ error: error.message });
    }
});
router.put("/:id/toggle-like", async (req, res) => {
    const { id } = req.params;
    console.log(`Toggling like for comment with ID ${id}`);
    try {
        const connection = await db_1.default;
        const [results] = await connection.query("SELECT likes FROM comments WHERE id = ?", [id]);
        const currentLikes = results[0].likes;
        const newLikes = currentLikes % 2 === 0 ? currentLikes + 1 : currentLikes - 1;
        await connection.query("UPDATE comments SET likes = ? WHERE id = ?", [newLikes, id]);
        res.json({ id, likes: newLikes });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ error: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`Deleting comment with ID ${id}`);
    try {
        const connection = await db_1.default;
        await connection.query("DELETE FROM comments WHERE id = ?", [id]);
        res.json({ id });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
router.get("/:tutorialId", async (req, res) => {
    const { tutorialId } = req.params;
    try {
        const connection = await db_1.default;
        const [results] = await connection.query("SELECT * FROM comments WHERE tutorial_id = ?", [tutorialId]);
        res.json(results);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ error: error.message });
    }
});
router.post("/", async (req, res) => {
    const { tutorial_id, content } = req.body;
    try {
        const connection = await db_1.default;
        const [results] = await connection.query("INSERT INTO comments (tutorial_id, content) VALUES (?, ?)", [tutorial_id, content]);
        res.json({ id: results.insertId, tutorial_id, content });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ error: error.message });
    }
});
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
router.get("/:tutorialId", (req, res) => {
    const { tutorialId } = req.params;
    db_1.default.query("SELECT * FROM comments WHERE tutorial_id = ?", [tutorialId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});
router.post("/", (req, res) => {
    const { tutorial_id, content } = req.body;
    db_1.default.query("INSERT INTO comments (tutorial_id, content) VALUES (?, ?)", [tutorial_id, content], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: results.insertId, tutorial_id, content });
    });
});
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    db_1.default.query("UPDATE comments SET content = ? WHERE id = ?", [content, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id, content });
    });
});
router.put("/:id/toggle-like", (req, res) => {
    const { id } = req.params;
    db_1.default.query("SELECT likes FROM comments WHERE id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const currentLikes = results[0].likes;
        const newLikes = currentLikes % 2 === 0 ? currentLikes + 1 : currentLikes - 1;
        db_1.default.query("UPDATE comments SET likes = ? WHERE id = ?", [newLikes, id], (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id, likes: newLikes });
        });
    });
});
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db_1.default.query("DELETE FROM comments WHERE id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id });
    });
});
exports.default = router;

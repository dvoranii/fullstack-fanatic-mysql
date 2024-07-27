"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const connection = await db_1.default;
        const [results] = await connection.query("SELECT * FROM tutorials");
        res.json(results);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ error: error.message });
    }
});
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await db_1.default;
        const [results] = await connection.query("SELECT * FROM tutorials WHERE id = ?", [id]);
        res.json(results[0]);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;

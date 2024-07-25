import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/:tutorialId", (req, res) => {
  const { tutorialId } = req.params;
  db.query(
    "SELECT * FROM comments WHERE tutorial_id = ?",
    [tutorialId],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

router.post("/", (req, res) => {
  const { tutorial_id, content } = req.body;
  db.query(
    "INSERT INTO comments (tutorial_id, content) VALUES (?, ?)",
    [tutorial_id, content],
    (err, results) => {
      if (err) throw err;
      res.json({ id: results.insertId, tutorial_id, content });
    }
  );
});

export default router;

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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  db.query(
    "UPDATE comments SET content = ? WHERE id = ?",
    [content, id],
    (err, results) => {
      if (err) throw err;
      res.json({ id, content });
    }
  );
});

router.put("/:id/toggle-like", (req, res) => {
  const { id } = req.params;
  db.query("SELECT likes FROM comments WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    const currentLikes = results[0].likes;
    const newLikes =
      currentLikes % 2 === 0 ? currentLikes + 1 : currentLikes - 1;
    db.query(
      "UPDATE comments SET likes = ? WHERE id = ?",
      [newLikes, id],
      (err, results) => {
        if (err) throw err;
        res.json({ id, likes: newLikes });
      }
    );
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM comments WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.json({ id });
  });
});

export default router;

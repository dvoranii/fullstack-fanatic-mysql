import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM tutorials", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM tutorials WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

export default router;

import express, { Request, Response } from "express";
import { csrfProtection } from "../middleware/csrf";

const router = express.Router();

router.get("/", csrfProtection, (req: Request, res: Response) => {
  if (req.csrfToken) {
    res.json({ csrfToken: req.csrfToken() });
  } else {
    res.status(500).json({ error: "CSRF token not available" });
  }
});

export default router;

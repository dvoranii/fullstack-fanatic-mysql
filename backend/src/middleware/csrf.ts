import { Request, Response } from "express";
import csrf from "csurf";

export const csrfProtection = csrf({ cookie: true });

export const getCsrfTokenHandler = (req: Request, res: Response) => {
  console.log("csrf token working!");
  if (req.csrfToken) {
    res.json({ csrfToken: req.csrfToken() });
  } else {
    res.status(500).json({ error: "CSRF token not available" });
  }
};

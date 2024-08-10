import { Request, Response, NextFunction } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user);
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

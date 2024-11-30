import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

const processRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req: Request) => req.ip || "unknown IP",
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  },
});

export default processRateLimiter;

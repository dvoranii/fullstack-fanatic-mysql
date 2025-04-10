import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types/User";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers["authorization"] as string | undefined;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserPayload;
    req.user = {
      userId: decoded.userId,
      googleId: decoded.googleId,
      email: decoded.email,
      display_name: decoded.display_name,
      name: decoded.name,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
};

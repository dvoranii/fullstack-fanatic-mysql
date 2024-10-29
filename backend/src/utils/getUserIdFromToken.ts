import jwt from "jsonwebtoken";

export const getUserIdFromToken = (authHeader?: string): number | undefined => {
  const jwtSecret = process.env.JWT_SECRET;

  if (authHeader && jwtSecret) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, jwtSecret) as { userId: number };
      return decoded.userId;
    } catch (error) {
      console.error("Invalid token");
    }
  }

  return undefined;
};

import jwt from "jsonwebtoken";

export const createJwtToken = (
  userId: number,
  email: string,
  googleId: string
) => {
  return jwt.sign(
    { userId, email, googleId },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
};

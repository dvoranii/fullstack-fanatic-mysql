import jwt from "jsonwebtoken";

export const createJwtToken = (
  userId: number,
  email: string,
  googleId: string
) => {
  return jwt.sign(
    { userId, email, googleId },
    process.env.JWT_SECRET as string,
    { expiresIn: "1m" }
  );
};

export const createRefreshToken = (
  userId: number,
  email: string,
  googleId: string
) => {
  return jwt.sign(
    { userId, email, googleId },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as {
    userId: number;
    email: string;
    googleId: string;
  };
};

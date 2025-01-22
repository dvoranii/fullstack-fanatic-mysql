import jwt from "jsonwebtoken";

export const createJwtToken = (
  userId: number,
  email: string,
  name: string,
  display_name: string | null,
  googleId?: string
) => {
  return jwt.sign(
    {
      userId,
      email,
      name,
      display_name: display_name || name,
      googleId: googleId || null,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "10m" }
  );
};

export const createRefreshToken = (
  userId: number,
  email: string,
  name: string,
  display_name: string | null,
  googleId?: string
) => {
  return jwt.sign(
    {
      userId,
      email,
      name,
      display_name: display_name || name,
      googleId: googleId || null,
    },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as {
    userId: number;
    email: string;
    name: string;
    display_name: string;
    googleId: string | null;
  };
};

import { AuthRequestBody } from "../types/AuthRequest";
import { User } from "../types/User";

export const registerUser = async (requestBody: AuthRequestBody) => {
  const res = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
};

export const loginUser = async (
  requestBody: AuthRequestBody
): Promise<User> => {
  const res = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
};

export const loginOrRegisterWithGoogle = async (token: string) => {
  const res = await fetch("http://localhost:5000/api/users/google-auth", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
};

export const refreshJwt = async () => {
  const res = await fetch("http://localhost:5000/api/users/refresh-token", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
};

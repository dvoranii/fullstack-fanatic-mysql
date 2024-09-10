import { AuthRequestBody } from "../types/AuthRequest";
import { LoginRequestBody } from "../types/LoginRequestBody";
import { User } from "../types/User";

export const registerUser = async (requestBody: AuthRequestBody) => {
  const res = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    credentials: "include",
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
  requestBody: LoginRequestBody
): Promise<User> => {
  const res = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    credentials: "include",
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

export const googleRegister = async (token: string) => {
  const res = await fetch("http://localhost:5000/api/users/google-register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (res.status === 409) {
    return { status: 409, message: "User already exists" };
  }

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const errorText =
      contentType && contentType.includes("application/json")
        ? await res.json()
        : await res.text();
    throw new Error(errorText);
  }

  const data = await res.json();
  if (data.message) {
    localStorage.setItem("accessToken", data.message);
  }

  return data;
};

export const googleLogin = async (token: string) => {
  const res = await fetch("http://localhost:5000/api/users/google-login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const errorText =
      contentType && contentType.includes("application/json")
        ? await res.json()
        : await res.text();
    throw new Error(errorText);
  }

  const data = await res.json();
  if (data.message) {
    localStorage.setItem("accessToken", data.message);
  }

  return data;
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

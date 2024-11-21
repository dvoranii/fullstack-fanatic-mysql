import { AuthRequestBody } from "../types/AuthRequest";
import { LoginRequestBody } from "../types/LoginRequestBody";
import { User } from "../types/User/User";
import { apiCall } from "../utils/apiUtils";

export const registerUser = async (requestBody: AuthRequestBody) => {
  const endpoint = `/api/users/register`;
  const { status, data } = await apiCall<User>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (status === 409) {
    throw new Error("User already exists.");
  }

  return data;
};

export const loginUser = async (
  requestBody: LoginRequestBody
): Promise<User> => {
  const endpoint = `/api/users/login`;
  const { data } = await apiCall<User>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const googleRegister = async (token: string) => {
  const endpoint = `/api/users/google-register`;
  const { status, data } = await apiCall<{ message: string }>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (status === 409) {
    return { status: 409, message: "User already exists" };
  }

  if (data.message) {
    localStorage.setItem("accessToken", data.message);
  }

  return { status, message: data.message };
};

export const googleLogin = async (token: string) => {
  const endpoint = `/api/users/google-login`;
  const { status, data } = await apiCall<{ message: string }>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (data.message) {
    localStorage.setItem("accessToken", data.message);
  }

  return { status, message: data.message };
};

// hard code endpoint
export const refreshJwt = async () => {
  const response = await fetch(
    `http://localhost:5000/api/users/refresh-token`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to refresh JWT");
  }

  const data = await response.json();
  return data;
};

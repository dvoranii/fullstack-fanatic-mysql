import { fetchCsrfToken } from "../services/csrfService";
import { AuthRequestBody } from "../types/AuthRequest";
import { LoginRequestBody } from "../types/LoginRequestBody";
import { User } from "../types/User/User";
import { apiCall } from "../utils/apiUtils";

export const registerUser = async (
  requestBody: AuthRequestBody,
  csrfToken: string
) => {
  const endpoint = `/users/register`;
  const { status, data } = await apiCall<User>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
  });

  if (status === 409) {
    throw new Error("User already exists.");
  }

  return data;
};

export const loginUser = async (
  requestBody: LoginRequestBody,
  csrfToken: string
): Promise<User> => {
  const endpoint = `/users/login`;
  const { data } = await apiCall<User>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
  });

  return data;
};

export const googleRegister = async (token: string, csrfToken: string) => {
  const endpoint = `/users/google-register`;
  const { status, data } = await apiCall<{ message: string }>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
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

export const googleLogin = async (token: string, csrfToken: string) => {
  const endpoint = `/users/google-login`;
  const { status, data } = await apiCall<{ message: string }>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
  });

  if (data.message) {
    localStorage.setItem("accessToken", data.message);
  }

  return { status, message: data.message };
};

// change url later
export const refreshJwt = async () => {
  try {
    const csrfToken = await fetchCsrfToken();

    const response = await fetch(`/api/users/refresh-token`, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh JWT");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error refreshing JWT:", error);
    throw error;
  }
};

import { AuthRequestBody } from "../types/AuthRequest";
import { LoginRequestBody } from "../types/LoginRequestBody";
import { User } from "../types/User/User";
import { apiCall } from "../utils/apiUtils";

export const registerUser = async (
  requestBody: AuthRequestBody,
  csrfToken: string,
  recaptchaToken: string
) => {
  const endpoint = `/users/register`;
  const { status, data } = await apiCall<User>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ ...requestBody, recaptchaToken }),
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

interface LoginResponse {
  token: string;
  user: User;
}

export const loginUser = async (
  requestBody: LoginRequestBody,
  csrfToken: string,
  recaptchaToken: string
): Promise<LoginResponse> => {
  const endpoint = `/users/login`;
  const { data } = await apiCall<LoginResponse>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ ...requestBody, recaptchaToken }),
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
  });

  localStorage.setItem("accessToken", data.token);

  return data;
};

export const googleRegister = async (
  token: string,
  csrfToken: string,
  recaptchaToken: string
) => {
  const endpoint = `/users/google-register`;

  const { status, data } = await apiCall<{
    accessToken: string;
    user: {
      userId: number;
      email: string;
      googleId: string;
      profile_picture: string;
    };
  }>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ token, recaptchaToken }),
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
  });

  if (status === 409) {
    return { status: 409, message: "User already exists" };
  }

  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
  }

  return {
    status,
    user: data.user,
    message: "Registration successful",
  };
};

export const googleLogin = async (
  token: string,
  csrfToken: string,
  recaptchaToken: string
) => {
  const endpoint = `/users/google-login`;

  const { status, data } = await apiCall<{
    accessToken: string;
    user: { userId: number; email: string; googleId: string };
  }>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ token, recaptchaToken }),
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
  });

  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
  }

  return { status, user: data.user };
};

export const refreshJwt = async () => {
  try {
    const response = await fetch(`/api/users/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to refresh JWT");
    }

    const data = await response.json();
    const { token } = data;

    if (token) {
      localStorage.setItem("accessToken", token);
    }

    return token;
  } catch (error) {
    console.error("Error refreshing JWT:", error);
    throw error;
  }
};

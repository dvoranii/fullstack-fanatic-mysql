import { apiCall } from "../utils/apiUtils";

export const forgotPassword = async (email: string) => {
  const endpoint = "/api/users/forgot-password";
  await apiCall(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const resetPassword = async (token: string, password: string) => {
  const endpoint = `/api/users/reset-password/${token}`;
  await apiCall(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const endpoint = "/api/users/change-password";
  await apiCall(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ currentPassword, newPassword }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

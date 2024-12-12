import { apiCall } from "../utils/apiUtils";

export const forgotPassword = async (
  email: string,
  csrfToken: string,
  recaptchaToken: string
) => {
  const endpoint = "/users/forgot-password";
  await apiCall(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ email, recaptchaToken }),
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
  });
};

export const getAuthTypeByEmail = async (email: string): Promise<string> => {
  const endpoint = "/users/auth-type/email";
  const response = await apiCall<{ auth_type: string }>(endpoint, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: { "Content-Type": "application/json" },
  });

  return response.data.auth_type;
};

export const resetPassword = async (
  token: string,
  password: string,
  csrfToken: string,
  recaptchaToken: string
) => {
  const endpoint = `/users/reset-password/${token}`;
  await apiCall(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ password, recaptchaToken }),
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
  });
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const endpoint = "/users/change-password";
  await apiCall(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ currentPassword, newPassword }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

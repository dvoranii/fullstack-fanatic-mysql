import { apiCall } from "../utils/apiUtils";

export const getUserAuthType = async (): Promise<string> => {
  const endpoint = `/users/auth-type`;
  const { data } = await apiCall<{ auth_type: string }>(endpoint, {
    method: "GET",
    credentials: "include",
  });

  return data.auth_type;
};

export const changePassword = async ({
  userId,
  currentPassword,
  newPassword,
}: {
  userId: number;
  currentPassword: string;
  newPassword: string;
}) => {
  const endpoint = `/users/${userId}/change-password`;

  try {
    const { data } = await apiCall(endpoint, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

export const verifyPassword = async (
  userId: number,
  currentPassword: string
) => {
  const endpoint = `/users/${userId}/verify-password`;
  const { status, data } = await apiCall<{ message: string }>(endpoint, {
    method: "POST",
    body: JSON.stringify({ currentPassword }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (status === 401) {
    throw new Error("Current password is incorrect");
  }

  return data.message;
};

// might change url later
export const logOutUser = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to log out");
  }
};

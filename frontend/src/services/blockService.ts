
import { User } from "../types/User/User";
import { getAuthToken } from "./tokenService";

const BASE_URL = import.meta.env.VITE_API_URL;

export const blockUser = async (userId: number, csrfToken: string): Promise<number> => {
  try {
    const token = getAuthToken();

    const response = await fetch(`${BASE_URL}/block/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
        "Authorization": `Bearer ${token}`
      },
      credentials: "include",
    });

    return response.status;
  } catch (error) {
    console.error("Error blocking user:", error);
    throw error;
  }
};

export const unblockUser = async (userId: number, csrfToken: string): Promise<number> => {
  try {
    const token = getAuthToken();

    const response = await fetch(`${BASE_URL}/block/unblock/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
        "Authorization": `Bearer ${token}`
      },
      credentials: "include",
    });

    return response.status;
  } catch (error) {
    console.error("Error unblocking user:", error);
    throw error;
  }
};

export const isUserBlocked = async (userId: number): Promise<boolean> => {


  try {

    const token = getAuthToken();

    const response = await fetch(`${BASE_URL}/block/is-blocked/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to check if user is blocked");
    }

    const data = await response.json();
    return data.isBlocked;
  } catch (error) {
    console.error("Error checking if user is blocked:", error);
    throw error;
  }
};

export const fetchBlockedUsers = async (): Promise<User[]> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/block/blocked`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blocked users");
    }

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error("Error fetching blocked users:", error);
    throw error;
  }
};
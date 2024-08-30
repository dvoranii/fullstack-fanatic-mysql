import { User } from "../types/User";
import { handleTokenExpiration } from "./tokenService";

export const getUserProfile = async (): Promise<User> => {
  const token = await handleTokenExpiration();

  const res = await fetch("http://localhost:5000/api/users/profile", {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  // console.log(res.json());
  return res.json();
};

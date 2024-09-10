import { User } from "../types/User";
import { handleTokenExpiration } from "./tokenService";
import { PublicProfile } from "../types/PublicProfileType";

export const getUserProfile = async (): Promise<User> => {
  const token = await handleTokenExpiration();

  const res = await fetch("http://localhost:5000/api/profile/profile", {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return res.json();
};

export const getUserPublicProfile = async (
  userId: string
): Promise<PublicProfile> => {
  const res = await fetch(
    `http://localhost:5000/api/users/user-profile/${userId}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch public user profile");
  }

  return res.json();
};

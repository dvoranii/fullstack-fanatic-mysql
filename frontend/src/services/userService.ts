import { User } from "../types/User";
import { handleTokenExpiration } from "./tokenService";
import { PublicProfile } from "../types/PublicProfileType";
import { Conversation } from "../types/Conversations";

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

export const fetchUserNamesAndPictures = async (
  conversations: Conversation[],
  loggedInUserId: number | undefined
): Promise<{
  userNames: { [key: number]: string };
  userPictures: { [key: number]: string };
}> => {
  const fetchedUserNames: { [key: number]: string } = {};
  const fetchedUserPictures: { [key: number]: string } = {};

  for (const conversation of conversations) {
    const otherUserId =
      loggedInUserId === conversation.user1_id
        ? conversation.user2_id
        : conversation.user1_id;

    try {
      const profile = await getUserPublicProfile(otherUserId.toString());
      fetchedUserNames[conversation.id] = profile.user.name;
      fetchedUserPictures[conversation.id] = profile.user.profile_picture || "";
    } catch (error) {
      console.error("Failed to fetch public user profile", error);
    }
  }

  return { userNames: fetchedUserNames, userPictures: fetchedUserPictures };
};

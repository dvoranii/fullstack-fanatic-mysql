import { User } from "../types/User/User";
import { apiCall } from "../utils/apiUtils";
import { PublicProfile } from "../types/PublicProfileType";
import { Conversation } from "../types/Conversations";

export const getUserProfile = async (): Promise<User> => {
  const endpoint = "/profile";
  const { data } = await apiCall<User>(endpoint, {
    method: "GET",
    credentials: "include",
  });

  return data;
};

export const getUserPublicProfile = async (
  userId: string
): Promise<PublicProfile> => {
  const endpoint = `/users/user-profile/${userId}`;
  const { data } = await apiCall<PublicProfile>(endpoint, {
    method: "GET",
  });

  return data;
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

export const updateUserProfile = async (
  profileData: FormData,
  token: string,
  csrfToken: string
) => {
  const endpoint = `/profile/update-profile`;

  const { status, data } = await apiCall<User>(endpoint, {
    method: "PUT",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-csrf-token": csrfToken,
    },
    body: profileData,
  });

  if (status < 200 || status >= 300) {
    throw new Error("Failed to update profile");
  }

  return data;
};

export const deleteSocialLink = async (
  platform: string,
  token: string,
  csrfToken: string
) => {
  const endpoint = `/profile/social-link/${platform}`;

  const { status } = await apiCall(endpoint, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-csrf-token": csrfToken,
    },
  });

  if (status < 200 || status >= 300) {
    throw new Error("Failed to delete social link");
  }
};

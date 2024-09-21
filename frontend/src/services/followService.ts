import { apiCall } from "../utils/apiUtils";

export interface FollowState {
  isFollowing: boolean;
  followersCount: number;
}

export const fetchFollowState = async (
  profileId: number
): Promise<FollowState> => {
  const endpoint = `/api/users/${profileId}/followers`;

  try {
    const { data } = await apiCall<FollowState>(endpoint, {
      method: "GET",
    });
    return {
      isFollowing: data.isFollowing || false,
      followersCount: data.followersCount || 0,
    };
  } catch (error) {
    console.error("Error fetching follow state:", error);
    throw new Error("Failed to fetch follow state");
  }
};

export const followUser = async (userId: number) => {
  const { status } = await apiCall(`/api/users/${userId}/follow`, {
    method: "POST",
  });
  return status;
};

export const unfollowUser = async (userId: number) => {
  const { status } = await apiCall(`/api/users/${userId}/follow`, {
    method: "DELETE",
  });
  return status;
};

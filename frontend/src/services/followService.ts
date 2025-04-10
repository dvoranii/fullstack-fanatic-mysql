import { User } from "../types/User/User";
import { apiCall } from "../utils/apiUtils";
import { getAuthToken } from "./tokenService";

export interface FollowersState {
  isFollowing: boolean;
  followersCount: number;
}

export interface FollowingState {
  followingCount: number;
}

export const fetchFollowersState = async (
  profileId: number
): Promise<FollowersState> => {
  const endpointFollowers = `/users/${profileId}/followers`;

  try {
    const { data: followersData } = await apiCall<{
      followersCount: number;
      isFollowing: boolean;
    }>(endpointFollowers, {
      method: "GET",
    });

    return {
      isFollowing: followersData.isFollowing || false,
      followersCount: followersData.followersCount || 0,
    };
  } catch (error) {
    console.error("Error fetching followers state:", error);
    throw new Error("Failed to fetch followers state");
  }
};

export const fetchFollowingState = async (
  profileId: number
): Promise<FollowingState> => {
  const endpointFollowing = `/users/${profileId}/following`;

  try {
    const { data: followingData } = await apiCall<{ followingCount: number }>(
      endpointFollowing,
      {
        method: "GET",
      }
    );

    return {
      followingCount: followingData.followingCount || 0,
    };
  } catch (error) {
    console.error("Error fetching following state:", error);
    throw new Error("Failed to fetch following state");
  }
};

export const followUser = async (userId: number, csrfToken: string) => {
  const { status } = await apiCall(`/users/${userId}/follow`, {
    method: "POST",
    credentials: "include",
    headers: {
      "x-csrf-token": csrfToken,
    },
  });

  return status;
};

export const unfollowUser = async (userId: number, csrfToken: string) => {
  const { status } = await apiCall(`/users/${userId}/follow`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "x-csrf-token": csrfToken,
    },
  });
  return status;
};

export const fetchFollowers = async (userId: number): Promise<User[]> => {
  const endpoint = `/users/${userId}/followers-list`;

  try {
    const { data } = await apiCall<{ followers: User[] }>(endpoint, {
      method: "GET",
    });
    return data.followers;
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw new Error("Failed to fetch followers");
  }
};

export const fetchFollowing = async (userId: number): Promise<User[]> => {
  const endpoint = `/users/${userId}/following-list`;

  try {
    const { data } = await apiCall<{ following: User[] }>(endpoint, {
      method: "GET",
    });
    return data.following;
  } catch (error) {
    console.error("Error fetching following:", error);
    throw new Error("Failed to fetch following");
  }
};

export const fetchFollowingWithoutBlocked = async (userId: number): Promise<User[]> => {
  const endpoint = `/users/${userId}/following-list`;
  const token = getAuthToken();

  try {
    const {data} = await apiCall<{ following: User[] }>(endpoint, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return data.following;
  } catch (error) {
    console.error("Error fetching non-blocked following:", error);
    throw new Error("Failed to fetch non-blocked following");
  }
}
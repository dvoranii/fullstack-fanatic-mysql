import { apiCall } from "../utils/apiUtils";
import { User } from "../types/User/User";

export const searchUsers = async (
  searchQuery: string,
  filter: "name" | "profession"
): Promise<User[]> => {
  const endpoint = `/api/network/search-users?searchQuery=${encodeURIComponent(
    searchQuery
  )}&filter=${filter}`;

  try {
    const { data } = await apiCall<{ users: User[] }>(endpoint, {
      method: "GET",
    });
    return data.users;
  } catch (error) {
    if (error instanceof Error && error.message.includes("404")) {
      return [];
    }
    throw error;
  }
};

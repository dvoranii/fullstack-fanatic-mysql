import { apiCall } from "../utils/apiUtils";
import { Tutorial } from "../types/Tutorial/Tutorial";

export const fetchPurchases = async (userId: number): Promise<Tutorial[]> => {
  const endpoint = `/api/purchases?userId=${userId}`;

  try {
    const { data } = await apiCall<{ purchases: Tutorial[] }>(endpoint, {
      method: "GET",
    });
    return data.purchases;
  } catch (error) {
    console.error("Error fetching purchases:", error);
    throw error;
  }
};

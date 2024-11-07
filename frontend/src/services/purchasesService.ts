import { apiCall } from "../utils/apiUtils";
import { PurchasedTutorial } from "../types/PurchasedItem";

export const fetchPurchasedTutorials = async (
  userId: number
): Promise<PurchasedTutorial[]> => {
  const endpoint = `/api/purchases?userId=${userId}`;

  try {
    const { data } = await apiCall<{ purchases: PurchasedTutorial[] }>(
      endpoint,
      {
        method: "GET",
      }
    );
    return data.purchases;
  } catch (error) {
    console.error("Error fetching purchases:", error);
    throw error;
  }
};

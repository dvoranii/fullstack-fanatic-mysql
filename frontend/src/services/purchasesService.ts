import { apiCall } from "../utils/apiUtils";
import { PurchasedItem } from "../types/PurchasedItem";

export const fetchPurchasedItems = async (
  userId: number
): Promise<PurchasedItem[]> => {
  const endpoint = `/api/purchases?userId=${userId}`;

  try {
    const { data } = await apiCall<{ purchases: PurchasedItem[] }>(endpoint, {
      method: "GET",
    });

    console.log(data.purchases);

    return data.purchases;
  } catch (error) {
    console.error("Error fetching purchases:", error);
    throw error;
  }
};

import { useEffect, useState } from "react";
import { fetchPurchasedItems } from "../services/purchasesService";

const usePurchasedItems = (profileId?: number) => {
  const [purchasedItemIds, setPurchasedItemIds] = useState<number[]>([]);

  useEffect(() => {
    const loadPurchasedItems = async () => {
      if (profileId) {
        try {
          const purchases = await fetchPurchasedItems(profileId);
          setPurchasedItemIds(purchases.map((p) => p.product_id));
        } catch (error) {
          console.error("Error fetching purchases:", error);
        }
      }
    };

    loadPurchasedItems();
  }, [profileId]);

  return purchasedItemIds;
};

export default usePurchasedItems;

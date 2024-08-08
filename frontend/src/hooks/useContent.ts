// useContent.ts
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ContentType } from "../types/ContentType";
import { addFavourite, removeFavourite } from "../services/favouritesService";
import { ContentItem } from "../types/ContentItem";

const LOCAL_STORAGE_FAVOURITES_KEY = "userFavourites";

export const useContent = (fetchEndpoint: string, contentType: ContentType) => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const { profile } = useContext(UserContext) || {};

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(fetchEndpoint);
        const data = await response.json();
        const savedFavourites = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_FAVOURITES_KEY) || "[]"
        );

        const itemsWithFavourite = data.map((item: ContentItem) => ({
          ...item,
          isFavourited: savedFavourites.includes(item.id),
        }));
        setItems(itemsWithFavourite);
      } catch (error) {
        console.error(`Error fetching ${contentType}:`, error);
      }
    };

    fetchItems();
  }, [fetchEndpoint, contentType]);

  const handleFavouriteClick = async (id: number) => {
    if (!profile) return;

    const googleId = profile.id;

    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, isFavourited: !item.isFavourited } : item
      );

      const currentFavourites = updatedItems
        .filter((item) => item.isFavourited)
        .map((item) => item.id);
      localStorage.setItem(
        LOCAL_STORAGE_FAVOURITES_KEY,
        JSON.stringify(currentFavourites)
      );
      console.log("Updated Items:", updatedItems);
      return updatedItems;
    });

    try {
      const item = items.find((item) => item.id === id);
      if (!item) return;

      if (item.isFavourited) {
        await removeFavourite(googleId, id, contentType);
        console.log("Favourite removed");
      } else {
        await addFavourite(googleId, id, contentType);
        console.log("Favourite added");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { items, handleFavouriteClick };
};

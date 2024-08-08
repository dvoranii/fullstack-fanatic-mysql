import { ContentType } from "../types/ContentType";
import { getUser } from "./userService";

export const addFavourite = async (
  googleId: string,
  itemId: number,
  contentType: ContentType
) => {
  try {
    const userId = await getUser(googleId);
    const response = await fetch("/api/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        google_id: googleId,
        item_id: itemId,
        user_id: userId,
        content_type: contentType,
      }),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  } catch (error) {
    console.error("Error adding favourite:", error);
  }
};

export const removeFavourite = async (
  googleId: string,
  itemId: number,
  contentType: ContentType
) => {
  try {
    const userId = await getUser(googleId);
    const response = await fetch("/api/favourites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        google_id: googleId,
        item_id: itemId,
        user_id: userId,
        content_type: contentType,
      }),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  } catch (error) {
    console.error("Error removing favourite:", error);
  }
};

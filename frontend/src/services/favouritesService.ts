import { Tutorial } from "../types/Tutorial";
import { Blog } from "../types/Blog";
import { handleTokenExpiration } from "./tokenService";

export const getUserFavourites = async (): Promise<{
  tutorials: Tutorial[];
  blogs: Blog[];
}> => {
  const token = await handleTokenExpiration();
  const response = await fetch("/api/favourites", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch favourites");
  return response.json();
};

export const addFavourite = async (itemId: number, contentType: string) => {
  const token = await handleTokenExpiration();
  try {
    const response = await fetch("/api/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        item_id: itemId,
        content_type: contentType,
      }),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  } catch (error) {
    console.error("Error adding favourite:", error);
  }
};

export const removeFavourite = async (itemId: number, contentType: string) => {
  const token = await handleTokenExpiration();
  try {
    const response = await fetch("/api/favourites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        item_id: itemId,
        content_type: contentType, // Include content_type
      }),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  } catch (error) {
    console.error("Error removing favourite:", error);
  }
};

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

export const addFavourite = async (
  itemId: number,
  contentType: "tutorial" | "blog"
): Promise<Tutorial | Blog | undefined> => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/favourites/${contentType}/${itemId}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to add favourite");
    }

    const data = await res.json();

    // Return the object based on content type
    if (contentType === "tutorial") {
      return data as Tutorial;
    } else {
      return data as Blog;
    }
  } catch (error) {
    console.error("Error adding favourite:", error);
    return undefined;
  }
};

export const removeFavourite = async (
  itemId: number,
  contentType: "tutorial" | "blog"
) => {
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

import { Tutorial } from "../types/Tutorial/Tutorial";
import { Blog } from "../types/Blog/Blog";
import { apiCall } from "../utils/apiUtils";

export const getUserFavourites = async (): Promise<{
  tutorials: Tutorial[];
  blogs: Blog[];
}> => {
  const endpoint = "/api/favourites";

  const { data } = await apiCall<{ tutorials: Tutorial[]; blogs: Blog[] }>(
    endpoint,
    {
      method: "GET",
    }
  );

  return data;
};

export const getPublicUserFavourites = async (
  userId: number
): Promise<{ tutorials: Tutorial[]; blogs: Blog[] }> => {
  const endpoint = `/api/favourites/${userId}`;

  const { data } = await apiCall<{ tutorials: Tutorial[]; blogs: Blog[] }>(
    endpoint,
    {
      method: "GET",
    }
  );

  return data;
};

export const addFavourite = async (
  itemId: number,
  contentType: "tutorial" | "blog"
): Promise<Tutorial | Blog | undefined> => {
  try {
    const endpoint = "/api/favourites";

    const { data } = await apiCall<Tutorial | Blog>(endpoint, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        item_id: itemId,
        content_type: contentType,
      }),
    });

    return contentType === "tutorial" ? (data as Tutorial) : (data as Blog);
  } catch (error) {
    console.error("Error adding favourite:", error);
    return undefined;
  }
};

export const removeFavourite = async (
  itemId: number,
  contentType: "tutorial" | "blog"
): Promise<void> => {
  const endpoint = "/api/favourites";
  try {
    await apiCall<void>(endpoint, {
      method: "DELETE",
      body: JSON.stringify({
        item_id: itemId,
        content_type: contentType,
      }),
    });
  } catch (error) {
    console.error("Error removing favourite:", error);
  }
};

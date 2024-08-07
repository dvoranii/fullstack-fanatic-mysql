import { UserResponse } from "../types/UserResponse";
import { ContentType } from "../types/ContentType";

export const getUser = async (googleId: string): Promise<number> => {
  const response = await fetch(`/api/users?google_id=${googleId}`);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const userData: UserResponse = await response.json();
  return userData.user_id;
};

export const addFavourite = async (
  googleId: string,
  itemId: number,
  userId: number,
  itemType: ContentType
) => {
  const response = await fetch(`/api/favourites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      google_id: googleId,
      item_id: itemId,
      user_id: userId,
      item_type: itemType,
    }),
  });

  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return response.json();
};

export const removeFavourite = async (
  googleId: string,
  itemId: number,
  userId: number,
  itemType: ContentType
) => {
  const response = await fetch(
    `/api/favourites?google_id=${googleId}&item_id=${itemId}&user_id=${userId}&item_type=${itemType}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return response.json();
};

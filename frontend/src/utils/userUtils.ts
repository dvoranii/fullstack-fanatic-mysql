// utils/userUtils.ts

import { getUserProfile } from "../services/userService";
import { getUserFavourites } from "../services/favouritesService";
import { handleTokenExpiration } from "../services/tokenService";
import { User } from "../types/User";
import { Tutorial } from "../types/Tutorial";
import { Blog } from "../types/Blog";

export const fetchUserProfileAndFavourites = async (
  setProfile: (profile: User) => void,
  setFavouriteTutorials: (tutorials: Tutorial[]) => void,
  setFavouriteBlogs: (blogs: Blog[]) => void,
  setError: (error: string | null) => void,
  setLoading?: (loading: boolean) => void
) => {
  try {
    const token = await handleTokenExpiration();
    if (!token) {
      if (setLoading) setLoading(false);
      return;
    }
    const userProfile = await getUserProfile();
    setProfile(userProfile);
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    const userFavourites = await getUserFavourites();
    setFavouriteTutorials(userFavourites.tutorials);
    setFavouriteBlogs(userFavourites.blogs);
  } catch (err) {
    setError("Failed to load user data");
    console.error("Failed to fetch user data:", err);
  } finally {
    if (setLoading) setLoading(false);
  }
};

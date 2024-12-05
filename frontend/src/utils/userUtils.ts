import { getUserProfile } from "../services/profileService";
import { getUserFavourites } from "../services/favouritesService";
import { handleTokenExpiration } from "../services/tokenService";
import { User } from "../types/User/User";
import { Tutorial } from "../types/Tutorial/Tutorial";
import { Blog } from "../types/Blog/Blog";
import { fetchUserComments } from "../services/commentService";
import { CommentType } from "../types/Comment/Comment";
import { fetchPurchasedItems } from "../services/purchasesService";
import { PurchasedItem } from "../types/PurchasedItem";

export const fetchUserProfileFavouritesAndComments = async (
  setProfile: (profile: User) => void,
  setFavouriteTutorials: (tutorials: Tutorial[]) => void,
  setFavouriteBlogs: (blogs: Blog[]) => void,
  setComments: (comments: CommentType[]) => void,
  setPurchasedItems: (items: PurchasedItem[]) => void,
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

    const { comments: userComments } = await fetchUserComments(userProfile.id);
    setComments(userComments);

    const purchases = await fetchPurchasedItems(userProfile.id);
    setPurchasedItems(purchases);
  } catch (err) {
    setError("Failed to load user data");
    console.error("Failed to fetch user data:", err);
  } finally {
    if (setLoading) setLoading(false);
  }
};

import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types/User";
import { getUserProfile } from "../services/userService";
import {
  getUserFavourites,
  addFavourite,
  removeFavourite,
} from "../services/favouritesService";
import { Tutorial } from "../types/Tutorial";
import { Blog } from "../types/Blog";
// import { fetchComments } from "../services/commentService";
import { CommentType } from "../types/Comment";

export interface UserContextType {
  profile: User | null;
  setProfile: (profile: User | null) => void;
  logOut: () => void;
  favouriteTutorials: Tutorial[];
  favouriteBlogs: Blog[];
  toggleFavourite: (itemId: number, contentType: "tutorial" | "blog") => void;
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
  loading: boolean;
  error: string | null;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [favouriteTutorials, setFavouriteTutorials] = useState<Tutorial[]>([]);
  const [favouriteBlogs, setFavouriteBlogs] = useState<Blog[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]); // New state for comments
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfileAndFavourites = async () => {
      try {
        const userProfile = await getUserProfile();

        setProfile(userProfile);
        localStorage.setItem("userProfile", JSON.stringify(userProfile));

        const userFavourites = await getUserFavourites();
        setFavouriteTutorials(userFavourites.tutorials);
        setFavouriteBlogs(userFavourites.blogs);

        // if (userProfile) {
        //   const fetchedComments = await fetchComments("tutorial", 1, true);

        //   const userAuthoredComments = fetchedComments.filter(
        //     (comment) => Number(comment.user_id) === Number(userProfile.id)
        //   );

        //   if (userAuthoredComments.length > 0) {
        //     console.log("User authored comments:", userAuthoredComments);
        //   }

        //   setComments(fetchedComments);
        // }
      } catch (err) {
        setError("Failed to load user data");
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfileAndFavourites();
  }, []);

  // Helper function for optimistic UI update
  const updateFavourites = <T extends { id: number }>(
    isCurrentlyFavourited: boolean,
    itemId: number,
    setFavourites: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    if (isCurrentlyFavourited) {
      setFavourites((prevFavourites) =>
        prevFavourites.filter((item) => item.id !== itemId)
      );
    } else {
      setFavourites((prevFavourites) => [
        ...prevFavourites,
        { id: itemId } as T,
      ]);
    }
  };

  // Helper function to handle API calls and revert optimistic updates on error
  const handleApiToggle = async <T extends { id: number }>(
    isCurrentlyFavourited: boolean,
    itemId: number,
    contentType: "tutorial" | "blog",
    setFavourites: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    try {
      if (isCurrentlyFavourited) {
        await removeFavourite(itemId, contentType);
      } else {
        const newFavourite = await addFavourite(itemId, contentType);
        if (!newFavourite) {
          updateFavourites(!isCurrentlyFavourited, itemId, setFavourites);
        }
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);

      updateFavourites(!isCurrentlyFavourited, itemId, setFavourites);
    }
  };

  const toggleFavourite = async (
    itemId: number,
    contentType: "tutorial" | "blog"
  ) => {
    if (contentType === "tutorial") {
      const isCurrentlyFavourited = favouriteTutorials.some(
        (tutorial) => tutorial.id === itemId
      );

      // Optimistic UI update
      updateFavourites(isCurrentlyFavourited, itemId, setFavouriteTutorials);

      // Handle API call
      await handleApiToggle(
        isCurrentlyFavourited,
        itemId,
        contentType,
        setFavouriteTutorials
      );
    } else if (contentType === "blog") {
      const isCurrentlyFavourited = favouriteBlogs.some(
        (blog) => blog.id === itemId
      );

      // Optimistic UI update
      updateFavourites(isCurrentlyFavourited, itemId, setFavouriteBlogs);

      // Handle API call
      await handleApiToggle(
        isCurrentlyFavourited,
        itemId,
        contentType,
        setFavouriteBlogs
      );
    }
  };

  const logOut = () => {
    setProfile(null);
    setFavouriteTutorials([]);
    setFavouriteBlogs([]);
    setComments([]); // Clear comments on logout
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userProfile");
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
        logOut,
        favouriteTutorials,
        favouriteBlogs,
        toggleFavourite,
        comments, // Provide comments in context
        setComments, // Optionally provide setComments
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

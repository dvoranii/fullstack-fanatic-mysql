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

export interface UserContextType {
  profile: User | null;
  setProfile: (profile: User | null) => void;
  logOut: () => void;
  favouriteTutorials: Tutorial[];
  favouriteBlogs: Blog[];
  toggleFavourite: (itemId: number, contentType: "tutorial" | "blog") => void;
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
      } catch (err) {
        setError("Failed to load user data");
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfileAndFavourites();
  }, []);

  const toggleFavourite = async (
    itemId: number,
    contentType: "tutorial" | "blog"
  ) => {
    if (contentType === "tutorial") {
      const isCurrentlyFavourited = favouriteTutorials.some(
        (tutorial) => tutorial.id === itemId
      );

      if (isCurrentlyFavourited) {
        await removeFavourite(itemId, contentType);
        setFavouriteTutorials((prevFavourites) =>
          prevFavourites.filter((tutorial) => tutorial.id !== itemId)
        );
      } else {
        const newFavourite = await addFavourite(itemId, contentType);
        if (newFavourite) {
          setFavouriteTutorials((prevFavourites) => [
            ...prevFavourites,
            newFavourite as Tutorial,
          ]);
        }
      }
    } else if (contentType === "blog") {
      const isCurrentlyFavourited = favouriteBlogs.some(
        (blog) => blog.id === itemId
      );

      if (isCurrentlyFavourited) {
        await removeFavourite(itemId, contentType);
        setFavouriteBlogs((prevFavourites) =>
          prevFavourites.filter((blog) => blog.id !== itemId)
        );
      } else {
        const newFavourite = await addFavourite(itemId, contentType);
        if (newFavourite) {
          setFavouriteBlogs((prevFavourites) => [
            ...prevFavourites,
            newFavourite as Blog,
          ]);
        }
      }
    }
  };

  const logOut = () => {
    setProfile(null);
    setFavouriteTutorials([]);
    setFavouriteBlogs([]);
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
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

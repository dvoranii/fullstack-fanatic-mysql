import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types/User";
import { removeFavourite, addFavourite } from "../services/favouritesService";

export interface UserContextType {
  profile: User | null;
  setProfile: (profile: User | null) => void;
  logOut: () => void;
  favouriteTutorials: number[];
  favouriteBlogs: number[];
  toggleFavourite: (itemId: number, contentType: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<User | null>(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  const [favouriteTutorials, setFavouriteTutorials] = useState<number[]>(() => {
    const savedTutorialFavourites = localStorage.getItem("favouriteTutorials");
    return savedTutorialFavourites ? JSON.parse(savedTutorialFavourites) : [];
  });

  const [favouriteBlogs, setFavouriteBlogs] = useState<number[]>(() => {
    const savedBlogFavourites = localStorage.getItem("favouriteBlogs");
    return savedBlogFavourites ? JSON.parse(savedBlogFavourites) : [];
  });

  useEffect(() => {
    if (profile) {
      console.log(profile);
      localStorage.setItem("userProfile", JSON.stringify(profile));

      const savedTutorialFavourites =
        localStorage.getItem("favouriteTutorials");
      if (savedTutorialFavourites) {
        setFavouriteTutorials(JSON.parse(savedTutorialFavourites));
      }

      const savedBlogFavourites = localStorage.getItem("favouriteBlogs");
      if (savedBlogFavourites) {
        setFavouriteBlogs(JSON.parse(savedBlogFavourites));
      }
    } else {
      localStorage.removeItem("userProfile");
      setFavouriteTutorials([]);
      setFavouriteBlogs([]);
    }
  }, [profile]);

  const toggleFavourite = async (itemId: number, contentType: string) => {
    let currentFavourites: number[];
    let updateFavourites: (favourites: number[]) => void;
    let storageKey: string;

    if (contentType === "tutorial") {
      currentFavourites = favouriteTutorials;
      updateFavourites = setFavouriteTutorials;
      storageKey = "favouriteTutorials";
    } else if (contentType === "blog") {
      currentFavourites = favouriteBlogs;
      updateFavourites = setFavouriteBlogs;
      storageKey = "favouriteBlogs";
    } else {
      return;
    }

    const isCurrentlyFavourited = currentFavourites.includes(itemId);

    try {
      if (isCurrentlyFavourited) {
        await removeFavourite(itemId, contentType);
        console.log("Favourite removed");
        const updatedFavourites = currentFavourites.filter(
          (id) => id !== itemId
        );
        updateFavourites(updatedFavourites);
        localStorage.setItem(storageKey, JSON.stringify(updatedFavourites));
      } else {
        await addFavourite(itemId, contentType);
        console.log("Favourite added");
        const updatedFavourites = [...currentFavourites, itemId];
        updateFavourites(updatedFavourites);
        localStorage.setItem(storageKey, JSON.stringify(updatedFavourites));
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types/User";
import { removeFavourite, addFavourite } from "../services/favouritesService";

export interface UserContextType {
  profile: User | null;
  setProfile: (profile: User | null) => void;
  logOut: () => void;
  favouriteTutorials: number[];
  toggleFavourite: (tutorialId: number) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<User | null>(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  const [favouriteTutorials, setFavouriteTutorials] = useState<number[]>([]);

  useEffect(() => {
    if (profile) {
      console.log(profile);
      localStorage.setItem("userProfile", JSON.stringify(profile));

      const savedFavourites = localStorage.getItem("favouriteTutorials");
      if (savedFavourites) {
        setFavouriteTutorials(JSON.parse(savedFavourites));
      }
    } else {
      localStorage.removeItem("userProfile");
    }
  }, [profile]);

  const toggleFavourite = async (tutorialId: number) => {
    const isCurrentlyFavourited = favouriteTutorials.includes(tutorialId);
    const updatedFavourites = isCurrentlyFavourited
      ? favouriteTutorials.filter((id) => id !== tutorialId)
      : [...favouriteTutorials, tutorialId];

    setFavouriteTutorials(updatedFavourites);
    localStorage.setItem(
      "favouriteTutorials",
      JSON.stringify(updatedFavourites)
    );

    try {
      if (isCurrentlyFavourited) {
        await removeFavourite(tutorialId, "tutorial"); // API call to remove favourite
        console.log("Favourite removed");
      } else {
        await addFavourite(tutorialId, "tutorial"); // API call to add favourite
        console.log("Favourite added");
      }
    } catch (error) {
      console.error("Error updating favourite status:", error);
      // Revert the favourite status if the API call fails
      setFavouriteTutorials(favouriteTutorials);
      localStorage.setItem(
        "favouriteTutorials",
        JSON.stringify(favouriteTutorials)
      );
    }
  };

  const logOut = () => {
    setProfile(null);
    setFavouriteTutorials([]);
    localStorage.removeItem("accessToken");
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
        logOut,
        favouriteTutorials,
        toggleFavourite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

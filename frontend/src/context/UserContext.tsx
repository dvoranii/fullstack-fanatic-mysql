import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types/User";

export interface UserContextType {
  profile: User | null;
  setProfile: (profile: User | null) => void;
  logOut: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<User | null>(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  useEffect(() => {
    if (profile) {
      localStorage.setItem("userProfile", JSON.stringify(profile));
    } else {
      localStorage.removeItem("userProfile");
    }
  }, [profile]);

  const logOut = () => {
    setProfile(null);
  };

  return (
    <UserContext.Provider value={{ profile, setProfile, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

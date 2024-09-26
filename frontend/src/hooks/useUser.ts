import { useContext } from "react";
import { UserContextType } from "../types/User/UserContextType";
import { UserContext } from "../context/UserContext";

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useUser;

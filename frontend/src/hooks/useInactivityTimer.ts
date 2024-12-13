import { useEffect } from "react";
import { useAuthUtils } from "../utils/useAuthUtils";

export const useInactivityTimer = () => {
  const { logOut } = useAuthUtils();

  useEffect(() => {
    let logoutTimeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(logoutTimeout);

      logoutTimeout = setTimeout(() => {
        console.log("User inactive for 1 minute. Logging out...");
        logOut();
      }, 15 * 60 * 1000);
    };

    const handleActivity = () => {
      resetTimer();
    };

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);
    document.addEventListener("scroll", handleActivity);

    resetTimer();

    return () => {
      clearTimeout(logoutTimeout);
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("scroll", handleActivity);
    };
  }, [logOut]);

  return null;
};

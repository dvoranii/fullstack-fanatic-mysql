import { useEffect } from "react";
import { useAuthUtils } from "../utils/useAuthUtils";

export const useInactivityTimer = () => {
  const { logOut } = useAuthUtils();

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    const resetTimer = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        logOut();
      }, 15 * 60 * 1000);
    };

    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);
    document.addEventListener("scroll", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("keydown", resetTimer);
      document.removeEventListener("scroll", resetTimer);
    };
  }, [logOut]);
};

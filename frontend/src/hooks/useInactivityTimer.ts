import { useEffect, useState } from "react";
import { useAuthUtils } from "../utils/useAuthUtils";

export const useInactivityTimer = () => {
  const { logOut } = useAuthUtils();

  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5 * 60);

  useEffect(() => {
    let logoutTimeout: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(logoutTimeout);
      clearInterval(countdownInterval);
      setShowModal(false);

      logoutTimeout = setTimeout(() => {
        console.log("10 minutes inactive. Showing modal...");
        setShowModal(true);
        startCountdown();
      }, 10 * 60 * 1000);
    };

    const startCountdown = () => {
      let timeLeft = 5 * 60;
      setCountdown(timeLeft);

      countdownInterval = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);

        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          console.log("User inactive for 15 minutes. Logging out...");
          logOut();
        }
      }, 1000);
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
      clearInterval(countdownInterval);
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("scroll", handleActivity);
    };
  }, [logOut]);

  return { showModal, countdown };
};

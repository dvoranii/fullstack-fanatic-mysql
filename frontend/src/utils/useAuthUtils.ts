import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import useUser from "../hooks/useUser";

export const useAuthUtils = () => {
  const navigate = useNavigate();
  const { setProfile, setFavouriteTutorials, setFavouriteBlogs, setComments } =
    useUser();

  const logOut = async (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | null
  ) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    try {
      await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      googleLogout();
      setProfile(null);
      setFavouriteTutorials([]);
      setFavouriteBlogs([]);
      setComments([]);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userProfile");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Failed to log out: ", error);
    }
  };

  return {
    logOut,
  };
};

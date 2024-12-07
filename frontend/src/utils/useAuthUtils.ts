import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import useUser from "../hooks/useUser";
import { logOutUser } from "../services/userService";

export const useAuthUtils = () => {
  const navigate = useNavigate();
  const {
    setProfile,
    setFavouriteTutorials,
    setFavouriteBlogs,
    setComments,
    setCartItems,
    setSubscriptionItem,
  } = useUser();

  const logOut = async (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | null
  ) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    try {
      await logOutUser();
      googleLogout();
      setProfile(null);
      setFavouriteTutorials([]);
      setFavouriteBlogs([]);
      setComments([]);
      setCartItems([]);
      setSubscriptionItem(null);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("favouriteBlogs");
      localStorage.removeItem("favouriteTutorials");
      localStorage.removeItem("userBlogFavourites");
      localStorage.removeItem("userFavourites");
      localStorage.removeItem("_grecaptcha");

      // Optionally clear cart from sessionStorage as well
      sessionStorage.removeItem("cartItems");
      sessionStorage.removeItem("subscriptionItem");

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Failed to log out: ", error);
    }
  };

  return {
    logOut,
  };
};

// For future use
// Object.keys(localStorage).forEach((key) => {
//   if (key.startsWith("app_")) {
//     localStorage.removeItem(key);
//   }
// });

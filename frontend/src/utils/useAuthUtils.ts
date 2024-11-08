import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import useUser from "../hooks/useUser";

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
      await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      googleLogout();
      setProfile(null);
      setFavouriteTutorials([]);
      setFavouriteBlogs([]);
      setComments([]);
      setCartItems([]); // Clear the cart items
      setSubscriptionItem(null);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("userProfile");

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

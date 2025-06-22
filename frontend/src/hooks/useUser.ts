import { useContext } from "react";
import { UserContextType } from "../types/User/UserContextType";
import { UserContext } from "../context/UserContext";

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    // Return a safe default state that matches UserContextType
    return {
      profile: null,
      setProfile: () => {},
      fetchProfile: async () => {},
      favouriteTutorials: [],
      setFavouriteTutorials: () => {},
      favouriteBlogs: [],
      setFavouriteBlogs: () => {},
      toggleFavourite: () => {},
      comments: [],
      setComments: () => {},
      cartItems: [],
      setCartItems: () => {},
      addItemToCart: () => {},
      removeItemFromCart: () => {},
      clearCart: () => {},
      addSubscriptionToCart: () => {},
      removeSubscriptionFromCart: () => {},
      subscriptionItem: null,
      setSubscriptionItem: () => {},
      purchasedItems: [],
      setPurchasedItems: () => {},
      unreadNotificationCount: 0,
      setUnreadNotificationCount: () => {},
      isReadNotificationUIUpdate: {},
      setIsReadNotificationUIUpdate: () => {},
      loading: true,  
      error: null,
      blockStatusVersion: 0,
      refreshBlockStatus: () => {}
    };
  }
  return context;
};

export default useUser;
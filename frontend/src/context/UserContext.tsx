import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types/User/User";
import { fetchUserProfileFavouritesAndComments } from "../utils/userUtils";
import { addFavourite, removeFavourite } from "../services/favouritesService";
import { Tutorial } from "../types/Tutorial/Tutorial";
import { Blog } from "../types/Blog/Blog";
import { PurchasedItem } from "../types/PurchasedItem";
import { CommentType } from "../types/Comment/Comment";
import { UserContextType } from "../types/User/UserContextType";
import { CartItem } from "../types/CartItem";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [favouriteTutorials, setFavouriteTutorials] = useState<Tutorial[]>([]);
  const [favouriteBlogs, setFavouriteBlogs] = useState<Blog[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unreadNotificationCount, setUnreadNotificationCount] =
    useState<number>(0);
  const [isReadNotificationUIUpdate, setIsReadNotificationUIUpdate] = useState<
    Record<number, boolean>
  >({});

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = sessionStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [subscriptionItem, setSubscriptionItem] = useState<CartItem | null>(
    () => {
      const storedSubscriptionItem = sessionStorage.getItem("subscriptionItem");
      return storedSubscriptionItem ? JSON.parse(storedSubscriptionItem) : null;
    }
  );

  useEffect(() => {
    const fetchUserData = async () => {
      await fetchUserProfileFavouritesAndComments(
        setProfile,
        setFavouriteTutorials,
        setFavouriteBlogs,
        setComments,
        setPurchasedItems,
        setError,
        setLoading
      );
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    sessionStorage.setItem(
      "subscriptionItem",
      JSON.stringify(subscriptionItem)
    );
  }, [subscriptionItem]);

  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems: CartItem[]) => [...prevItems, item]);
  };

  const removeItemFromCart = (id: number) => {
    setCartItems((prevItems: CartItem[]) =>
      prevItems.filter((item: CartItem) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addSubscriptionToCart = (item: CartItem) => {
    setSubscriptionItem(item);
  };

  const removeSubscriptionFromCart = () => {
    setSubscriptionItem(null);
  };

  const updateFavourites = <T extends { id: number }>(
    isCurrentlyFavourited: boolean,
    itemId: number,
    setFavourites: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    if (isCurrentlyFavourited) {
      // Create a new array reference when removing an item
      setFavourites((prevFavourites) =>
        prevFavourites.filter((item) => item.id !== itemId)
      );
    } else {
      // Create a new array reference when adding an item
      setFavourites((prevFavourites) => [
        ...prevFavourites,
        { id: itemId } as T,
      ]);
    }
  };

  const handleApiToggle = async <T extends { id: number }>(
    isCurrentlyFavourited: boolean,
    itemId: number,
    contentType: "tutorial" | "blog",
    setFavourites: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    try {
      if (isCurrentlyFavourited) {
        await removeFavourite(itemId, contentType);
      } else {
        const newFavourite = await addFavourite(itemId, contentType);
        if (!newFavourite) {
          updateFavourites(!isCurrentlyFavourited, itemId, setFavourites);
        }
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
      updateFavourites(!isCurrentlyFavourited, itemId, setFavourites);
    }
  };

  const toggleFavourite = async (
    itemId: number,
    contentType: "tutorial" | "blog"
  ) => {
    if (contentType === "tutorial") {
      const isCurrentlyFavourited = favouriteTutorials.some(
        (tutorial) => tutorial.id === itemId
      );

      updateFavourites(isCurrentlyFavourited, itemId, setFavouriteTutorials);

      await handleApiToggle(
        isCurrentlyFavourited,
        itemId,
        contentType,
        setFavouriteTutorials
      );
    } else if (contentType === "blog") {
      const isCurrentlyFavourited = favouriteBlogs.some(
        (blog) => blog.id === itemId
      );

      updateFavourites(isCurrentlyFavourited, itemId, setFavouriteBlogs);

      await handleApiToggle(
        isCurrentlyFavourited,
        itemId,
        contentType,
        setFavouriteBlogs
      );
    }
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
        favouriteTutorials,
        setFavouriteTutorials,
        favouriteBlogs,
        setFavouriteBlogs,
        purchasedItems,
        setPurchasedItems,
        toggleFavourite,
        comments,
        setComments,
        cartItems,
        setCartItems,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        subscriptionItem,
        setSubscriptionItem,
        addSubscriptionToCart,
        removeSubscriptionFromCart,
        unreadNotificationCount,
        setUnreadNotificationCount,
        isReadNotificationUIUpdate,
        setIsReadNotificationUIUpdate,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

import { User } from "./User";
import { CommentType } from "../Comment/Comment";
import { Tutorial } from "../Tutorial/Tutorial";
import { Blog } from "../Blog/Blog";
import { CartItem } from "../CartItem";
import { Dispatch, SetStateAction } from "react";
import { PurchasedItem } from "../PurchasedItem";

export interface UserContextType {
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  fetchProfile: () => Promise<void>;
  favouriteTutorials: Tutorial[];
  setFavouriteTutorials: Dispatch<SetStateAction<Tutorial[]>>;
  favouriteBlogs: Blog[];
  setFavouriteBlogs: Dispatch<SetStateAction<Blog[]>>;
  toggleFavourite: (itemId: number, contentType: "tutorial" | "blog") => void;
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: number) => void;
  clearCart: () => void;
  addSubscriptionToCart: (item: CartItem) => void;
  removeSubscriptionFromCart: () => void;
  subscriptionItem: CartItem | null;
  setSubscriptionItem: Dispatch<SetStateAction<CartItem | null>>;
  purchasedItems: PurchasedItem[];
  setPurchasedItems: Dispatch<SetStateAction<PurchasedItem[]>>;
  unreadNotificationCount: number;
  setUnreadNotificationCount: React.Dispatch<React.SetStateAction<number>>;
  isReadNotificationUIUpdate: Record<number, boolean>;
  setIsReadNotificationUIUpdate: React.Dispatch<
    React.SetStateAction<Record<number, boolean>>
  >;
  blockStatusVersion: number;
  refreshBlockStatus: () => void;
  loading: boolean;
  error: string | null;
}

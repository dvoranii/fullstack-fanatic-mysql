import { User } from "./User";
import { CommentType } from "../Comment/Comment";
import { Tutorial } from "../Tutorial/Tutorial";
import { Blog } from "../Blog/Blog";
import { CartItem } from "../CartItem";

export interface UserContextType {
  profile: User | null;
  setProfile: (profile: User | null) => void;
  favouriteTutorials: Tutorial[];
  setFavouriteTutorials: React.Dispatch<React.SetStateAction<Tutorial[]>>;
  favouriteBlogs: Blog[];
  setFavouriteBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  toggleFavourite: (itemId: number, contentType: "tutorial" | "blog") => void;
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: number) => void;
  clearCart: () => void;
  addSubscriptionToCart: (item: CartItem) => void;
  removeSubscriptionFromCart: () => void;
  subscriptionItem: CartItem | null;
  loading: boolean;
  error: string | null;
}

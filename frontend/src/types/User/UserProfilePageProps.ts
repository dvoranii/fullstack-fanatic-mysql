import { User } from "./User";
// import { Tutorial } from "../Tutorial/Tutorial";
// import { Blog } from "../Blog/Blog";
import { CommentType } from "../Comment/Comment";
// import { PurchasedItem } from "../PurchasedItem";

export interface UserProfilePageProps {
  profile: User;
  // favouriteTutorials: Tutorial[];
  // favouriteBlogs: Blog[];
  // purchasedItems: PurchasedItem[];
  comments: CommentType[];
  isEditable?: boolean;
  isOwnProfile: boolean;
  onEditProfileClick?: () => void;
  onBannerChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBannerUpload?: () => void;
  children?: React.ReactNode;
}

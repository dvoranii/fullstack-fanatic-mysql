import { User } from "./User";
import { Tutorial } from "../Tutorial/Tutorial";
import { Blog } from "../Blog/Blog";
import { CommentType } from "../Comment/Comment";

export interface UserProfilePageProps {
  profile: User;
  favouriteTutorials: Tutorial[];
  favouriteBlogs: Blog[];
  comments: CommentType[];
  isEditable?: boolean;
  isOwnProfile: boolean;
  onEditProfileClick?: () => void;
  onBannerChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBannerUpload?: () => void;
  children?: React.ReactNode;
}

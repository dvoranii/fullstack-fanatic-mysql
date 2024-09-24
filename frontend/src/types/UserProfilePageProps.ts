import { User } from "./User";
import { Tutorial } from "./Tutorial";
import { Blog } from "./Blog";
import { CommentType } from "./Comment";

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

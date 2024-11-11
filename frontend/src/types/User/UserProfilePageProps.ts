import { User } from "./User";
import { CommentType } from "../Comment/Comment";

export interface UserProfilePageProps {
  profile: User;
  comments: CommentType[];
  isEditable?: boolean;
  isOwnProfile: boolean;
  onEditProfileClick?: () => void;
  onBannerChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBannerUpload?: () => void;
  children?: React.ReactNode;
}

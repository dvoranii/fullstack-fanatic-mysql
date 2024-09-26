import { User } from "./User";
import { CommentType } from "../Comment/Comment";
import { Tutorial } from "../Tutorial/Tutorial";
import { Blog } from "../Blog/Blog";

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
  loading: boolean;
  error: string | null;
}

import { User } from "./User";
import { CommentType } from "./Comment";
import { Tutorial } from "./Tutorial";
import { Blog } from "./Blog";

export interface UserContextType {
  profile: User | null;
  setProfile: (profile: User | null) => void;
  logOut: () => void;
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

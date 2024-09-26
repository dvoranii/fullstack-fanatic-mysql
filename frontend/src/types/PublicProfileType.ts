import { Blog } from "./Blog/Blog";
import { Tutorial } from "./Tutorial/Tutorial";
import { User } from "./User/User";
import { CommentType } from "./Comment/Comment";

export interface PublicProfile {
  id: number;
  name: string;
  picture: string;
  favouriteTutorials: Tutorial[];
  favouriteBlogs: Blog[];
  comments?: CommentType[];
  user: User;
}

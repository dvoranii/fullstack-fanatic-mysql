import { Blog } from "./Blog";
import { Tutorial } from "./Tutorial";
import { User } from "./User";
import { CommentType } from "./Comment";

export interface PublicProfile {
  id: number;
  name: string;
  picture: string;
  favouriteTutorials: Tutorial[];
  favouriteBlogs: Blog[];
  comments?: CommentType[];
  user: User;
}

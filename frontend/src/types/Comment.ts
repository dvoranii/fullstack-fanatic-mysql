import { ContentType } from "./ContentType";
export interface CommentType {
  id: number;
  content_id: number;
  content_type: ContentType;
  content: string;
  created_at: string;
  likes: number;
  user_id: number;
  google_id: string;
  user_name: string;
  profile_picture: string;
  likedByUser?: boolean;
  replies: CommentType[];
}

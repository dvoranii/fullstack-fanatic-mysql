import { ContentType } from "../Content/ContentType";
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
  parent_comment_id: number | null;
  likedByUser?: boolean;
  replies?: CommentType[];
  has_replies?: boolean;
  hasMoreReplies?: boolean;
  _scrollTarget?: boolean;
  is_hidden?: boolean;
}

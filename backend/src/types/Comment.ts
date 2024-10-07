export interface Comment {
  id: number;
  content_id: number;
  content_type: "tutorial" | "blog";
  content: string;
  created_at: string;
  likes: number;
  user_id: number;
  google_id?: string | null;
  user_name: string;
  profile_picture: string | null;
  likedByUser?: boolean;
  parent_comment_id?: number;
  replies?: Comment[];
  has_replies?: boolean;
  hasMoreReplies?: boolean;
}

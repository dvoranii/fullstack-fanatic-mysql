export interface Comment {
  id: number;
  content_id: number;
  content_type: "tutorial" | "blog";
  content: string;
  created_at: string;
  likes: number;
  user_id: number;
  user_name: string;
  user_picture: string | null;
  likedByUser?: boolean;
  parent_comment_id?: number;
  replies?: Comment[];
}

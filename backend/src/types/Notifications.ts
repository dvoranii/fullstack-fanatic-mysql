export interface Notification {
  id: number;
  user_id: number;
  type: "like" | "reply" | "follow" | "message";
  is_read: boolean;
  sender_id: number;
  sender_name: string;
  sender_profile_picture: string;
  created_at: Date;
  comment_id?: number;
  content_id?: number;
  content_type?: "tutorial" | "blog";
}

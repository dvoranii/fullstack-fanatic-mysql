export interface Notification {
  id: number;
  userId: number;
  type: "like" | "reply" | "follow" | "message";
  is_read: boolean;
  sender_id: number;
  sender_name: string;
  sender_profile_picture: string;
  created_at: string;
}

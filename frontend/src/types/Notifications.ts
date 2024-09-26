export interface Notification {
  id: number;
  userId: number;
  type: "like" | "reply" | "follow" | "message";
  content: string;
  is_read: boolean;
  sender_id: number;
  created_at: string;
}

export interface Notification {
  id: number;
  user_id: number;
  type: "like" | "reply" | "follow" | "message";
  content: string;
  is_read: boolean;
  created_at: Date;
}

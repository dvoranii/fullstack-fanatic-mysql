export interface Notification {
  id: number;
  userId: number;
  type: "like" | "reply" | "follow" | "message";
  content: string;
  is_read: boolean;
  created_at: string;
}

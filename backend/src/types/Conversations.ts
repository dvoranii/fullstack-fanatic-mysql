export interface Conversation {
  id: number;
  user1_id: number;
  user2_id: number;
  created_at: string;
  subject: string;
  is_read: boolean;
}

export interface Conversation {
  id: number;
  user1_id: number;
  user2_id: number;
  created_at: string;
  subject: string;
  is_read_user1: boolean;
  is_read_user2: boolean;
  is_deleted_user1: boolean;
  is_deleted_user2: boolean;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  receiver_id: number;
  subject: string;
  content: string;
  is_read: boolean;
  sent_at: string;
}

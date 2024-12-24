export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  receiver_id: number;
  subject: string;
  content: string;
  sent_at: string;
  sender_picture: string;
  sender_name: string;
  receiver_picture: string;
  receiver_name: string;
}

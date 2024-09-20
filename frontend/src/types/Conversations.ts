import { Message } from "./Message";

export interface Conversation {
  id: number;
  user1_id: number;
  user2_id: number;
  created_at: string;
  messages: Message[];
  subject: string;
  is_read: number;
}

import { Conversation } from "../types/Conversations";
import { Message } from "../types/Message";
import { apiCall } from "../utils/apiUtils";

export const createOrGetConversation = async (
  loggedInUserId: number,
  userId: number,
  subject: string
): Promise<Conversation> => {
  const endpoint = `/api/conversations`;
  const { data } = await apiCall<Conversation>(endpoint, {
    method: "POST",
    body: JSON.stringify({
      user1_id: loggedInUserId,
      user2_id: userId,
      subject,
    }),
  });

  return data;
};

export const sendMessage = async (
  conversationId: number,
  loggedInUserId: number,
  receiverId: number,
  content: string
): Promise<Message> => {
  const endpoint = `/api/messages`;
  const { data } = await apiCall<Message>(endpoint, {
    method: "POST",
    body: JSON.stringify({
      conversation_id: conversationId,
      sender_id: loggedInUserId,
      receiver_id: receiverId,
      content,
    }),
  });

  return data;
};

export const getMessagesForConversation = async (
  conversationId: number
): Promise<Message[]> => {
  const endpoint = `/api/messages/${conversationId}`;
  const { data } = await apiCall<Message[]>(endpoint, {
    method: "GET",
  });

  return data;
};

export const fetchConversations = async (): Promise<Conversation[]> => {
  const endpoint = `/api/conversations`;
  const { data } = await apiCall<Conversation[]>(endpoint, {
    method: "GET",
  });

  return data;
};

import { Message } from "../types/Message";
import { apiCall } from "../utils/apiUtils";

export const sendMessage = async (
  conversationId: number,
  loggedInUserId: number,
  receiverId: number,
  content: string,
  csrfToken: string
): Promise<Message> => {
  const endpoint = `/api/messages`;
  const { data } = await apiCall<Message>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      conversation_id: conversationId,
      sender_id: loggedInUserId,
      receiver_id: receiverId,
      content,
    }),
    headers: {
      "x-csrf-token": csrfToken,
    },
  });

  return data;
};

export const getMessagesForConversation = async (
  conversationId: number,
  page: number = 1,
  limit: number = 10
): Promise<Message[]> => {
  const endpoint = `/api/messages/${conversationId}?page=${page}&limit=${limit}`;

  const { data } = await apiCall<{ messages: Message[]; hasMore: boolean }>(
    endpoint,
    {
      method: "GET",
    }
  );

  return data.messages;
};

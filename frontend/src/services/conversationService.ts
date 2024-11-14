import { apiCall } from "../utils/apiUtils";
import { Conversation } from "../types/Conversations";

export const fetchConversationById = async (
  conversationId: number
): Promise<Conversation | null> => {
  const endpoint = `/api/conversations/${conversationId}`;
  try {
    const { data } = await apiCall<Conversation>(endpoint, {
      method: "GET",
    });

    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch conversation:", error);
    return null;
  }
};

export const fetchConversations = async (): Promise<Conversation[]> => {
  const endpoint = `/api/conversations`;
  const { data } = await apiCall<Conversation[]>(endpoint, {
    method: "GET",
  });

  return data;
};

export const updateConversationReadStatus = async (conversationId: number) => {
  const endpoint = `/api/conversations/${conversationId}/read`;
  const { data } = await apiCall(endpoint, {
    method: "PATCH",
  });

  console.log(data);
  return data;
};

export const deleteConversation = async (conversationId: number) => {
  const endpoint = `/api/conversations/${conversationId}`;
  await apiCall(endpoint, {
    method: "DELETE",
  });
};

export const getUnreadConversationsCount = async (): Promise<number> => {
  const endpoint = `/api/conversations/unread/count`;
  const { data } = await apiCall<{ unreadCount: number }>(endpoint, {
    method: "GET",
  });
  return data.unreadCount;
};

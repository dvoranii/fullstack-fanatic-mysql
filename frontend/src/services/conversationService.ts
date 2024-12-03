import { apiCall } from "../utils/apiUtils";
import { Conversation } from "../types/Conversations";

export const checkExistingConversation = async (
  user1Id: number,
  user2Id: number
): Promise<{ exists: boolean; id?: number }> => {
  const endpoint = `/api/conversations/existing?user1_id=${user1Id}&user2_id=${user2Id}`;
  const { data } = await apiCall<{ exists: boolean; id?: number }>(endpoint, {
    method: "GET",
  });

  return data;
};

export const createOrGetConversation = async (
  loggedInUserId: number,
  userId: number,
  subject: string,
  csrfToken: string
): Promise<Conversation> => {
  const endpoint = `/api/conversations`;
  const { data } = await apiCall<Conversation>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      user1_id: loggedInUserId,
      user2_id: userId,
      subject,
    }),
    headers: {
      "x-csrf-token": csrfToken,
    },
  });

  return data;
};

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

export const updateConversationReadStatus = async (
  conversationId: number,
  csrfToken: string
) => {
  const endpoint = `/api/conversations/${conversationId}/read`;
  const { data } = await apiCall(endpoint, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "x-csrf-token": csrfToken,
    },
  });

  return data;
};

export const deleteConversation = async (
  conversationId: number,
  csrfToken: string
) => {
  const endpoint = `/api/conversations/${conversationId}`;
  await apiCall(endpoint, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "x-csrf-token": csrfToken,
    },
  });
};

export const getUnreadConversationsCount = async (): Promise<number> => {
  const endpoint = `/api/conversations/unread/count`;
  const { data } = await apiCall<{ unreadCount: number }>(endpoint, {
    method: "GET",
  });
  return data.unreadCount;
};

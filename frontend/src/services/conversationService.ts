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

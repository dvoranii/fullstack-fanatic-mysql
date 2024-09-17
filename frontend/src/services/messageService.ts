import { Conversation } from "../types/Conversations";
import { Message } from "../types/Message";
import { handleTokenExpiration } from "./tokenService";

const BASE_URL = "http://localhost:5000";

export const createOrGetConversation = async (
  loggedInUserId: number,
  userId: number
): Promise<Conversation> => {
  const token = await handleTokenExpiration();

  const conversationResponse = await fetch(`${BASE_URL}/api/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user1_id: loggedInUserId, user2_id: userId }),
  });

  if (!conversationResponse.ok) {
    throw new Error("Failed to create or get conversation");
  }

  return await conversationResponse.json();
};

export const sendMessage = async (
  conversationId: number,
  loggedInUserId: number,
  receiverId: number,
  subject: string,
  content: string
): Promise<Message> => {
  const token = await handleTokenExpiration();

  const messageResponse = await fetch(`${BASE_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      conversation_id: conversationId,
      sender_id: loggedInUserId,
      receiver_id: receiverId,
      subject,
      content,
    }),
  });

  if (!messageResponse.ok) {
    throw new Error("Failed to send message");
  }

  return await messageResponse.json();
};

export const getMessagesForConversation = async (
  conversationId: number
): Promise<Message[]> => {
  const token = await handleTokenExpiration();

  const response = await fetch(`${BASE_URL}/api/messages/${conversationId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load messages");
  }

  return await response.json();
};

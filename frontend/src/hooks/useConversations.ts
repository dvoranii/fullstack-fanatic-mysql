// useConversations.ts (Custom Hook)
import { useState, useEffect } from "react";
import { fetchConversations } from "../services/conversationService";
import { Conversation } from "../types/Conversations";

export const useConversations = (loggedInUserId: number | undefined) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const data = await fetchConversations();
        setConversations(data);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
        setConversations([]);
      }
    };

    if (loggedInUserId) {
      getConversations();
    }
  }, [loggedInUserId]);

  return { conversations, setConversations };
};

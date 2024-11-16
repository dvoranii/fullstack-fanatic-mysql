// useConversations.ts (Custom Hook)
import { useState, useEffect, useCallback } from "react";
import { fetchConversations } from "../services/conversationService";
import { fetchUserNamesAndPictures } from "../services/userService";
import { Conversation } from "../types/Conversations";

export const useConversations = (loggedInUserId: number | undefined) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [userNames, setUserNames] = useState<{ [key: number]: string }>({});
  const [userPictures, setUserPictures] = useState<{ [key: number]: string }>(
    {}
  );

  const fetchUserDetails = useCallback(
    async (conversations: Conversation[]) => {
      try {
        const { userNames, userPictures } = await fetchUserNamesAndPictures(
          conversations,
          loggedInUserId
        );
        setUserNames(userNames);
        setUserPictures(userPictures);
      } catch (error) {
        console.error("Failed to fetch user profiles", error);
      }
    },
    [loggedInUserId]
  );

  useEffect(() => {
    const getConversations = async () => {
      try {
        const data = await fetchConversations();
        setConversations(data);
        fetchUserDetails(data);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
        setConversations([]);
      }
    };

    if (loggedInUserId) {
      getConversations();
    }
  }, [fetchUserDetails, loggedInUserId]);

  return { conversations, setConversations, userNames, userPictures };
};

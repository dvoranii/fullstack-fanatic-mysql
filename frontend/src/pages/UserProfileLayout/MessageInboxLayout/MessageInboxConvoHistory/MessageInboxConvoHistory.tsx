import { useEffect, useState, useContext } from "react";
import {
  ConvoHistoryContainer,
  ReadFilterWrapper,
  ConversationWrapper,
} from "./MessageInboxConvoHistory.styled";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { Conversation } from "../../../../types/Conversations";
import { handleTokenExpiration } from "../../../../services/tokenService";
import { UserContext } from "../../../../context/UserContext";
import { getUserPublicProfile } from "../../../../services/userService";

interface MessageInboxConvoHistoryProps {
  onConversationSelect: (conversationId: number) => void;
}

const BASE_URL = "http://localhost:5000";

const MessageInboxConvoHistory: React.FC<MessageInboxConvoHistoryProps> = ({
  onConversationSelect,
}) => {
  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [userNames, setUserNames] = useState<{ [key: number]: string }>({});
  const [boldSpan, setBoldSpan] = useState("read");

  useEffect(() => {
    const fetchConversations = async () => {
      const token = await handleTokenExpiration();
      try {
        const response = await fetch(`${BASE_URL}/api/conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setConversations(data);
          fetchUserNames(data); // Fetch names of the other users
        } else {
          console.error("Unexpected response format:", data);
          setConversations([]);
        }
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
        setConversations([]);
      }
    };
    fetchConversations();
  }, []);

  const fetchUserNames = async (conversations: Conversation[]) => {
    const fetchedUserNames: { [key: number]: string } = {};
    for (const conversation of conversations) {
      const otherUserId =
        loggedInUserId === conversation.user1_id
          ? conversation.user2_id
          : conversation.user1_id;

      const profile = await getUserPublicProfile(otherUserId.toString());
      fetchedUserNames[conversation.id] = profile.user.name;
    }
    setUserNames(fetchedUserNames);
  };

  const toggleBold = (selectedSpan: string) => {
    setBoldSpan(selectedSpan);
  };

  return (
    <ConvoHistoryContainer>
      <SearchBar />
      <ReadFilterWrapper>
        <p>
          <span
            onClick={() => toggleBold("read")}
            className={boldSpan === "read" ? "bold" : "normal"}
          >
            READ
          </span>
          &nbsp;|&nbsp;
          <span
            onClick={() => toggleBold("unread")}
            className={boldSpan === "unread" ? "bold" : "normal"}
          >
            UNREAD
          </span>
        </p>
      </ReadFilterWrapper>

      {conversations.map((conversation) => (
        <ConversationWrapper key={conversation.id}>
          <p>
            Conversation with&nbsp;
            {userNames[conversation.id] || `User ${conversation.user2_id}`}
          </p>

          <button onClick={() => onConversationSelect(conversation.id)}>
            Open Conversation
          </button>
        </ConversationWrapper>
      ))}
    </ConvoHistoryContainer>
  );
};

export default MessageInboxConvoHistory;

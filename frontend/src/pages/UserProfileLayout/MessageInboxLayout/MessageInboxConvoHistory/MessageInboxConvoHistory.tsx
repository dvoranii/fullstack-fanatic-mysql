import { useEffect, useState } from "react";
import {
  ConvoHistoryContainer,
  ReadFilterWrapper,
} from "./MessageInboxConvoHistory.styled";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { Conversation } from "../../../../types/Conversations";
import { handleTokenExpiration } from "../../../../services/tokenService";

interface MessageInboxConvoHistoryProps {
  onConversationSelect: (conversationId: number) => void;
}

const BASE_URL = "http://localhost:5000";

const MessageInboxConvoHistory: React.FC<MessageInboxConvoHistoryProps> = ({
  onConversationSelect,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [boldSpan, setBoldSpan] = useState("read");

  useEffect(() => {
    const fetchConversations = async () => {
      const token = await handleTokenExpiration();
      try {
        const response = await fetch(
          `${BASE_URL}/api/conversations/conversations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (Array.isArray(data)) {
          setConversations(data);
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
      <div>
        {conversations.map((conversation) => (
          <div key={conversation.id}>
            <p>Conversation with User {conversation.user2_id}</p>
            {/* Call onConversationSelect when a conversation is selected */}
            <button onClick={() => onConversationSelect(conversation.id)}>
              Open Conversation
            </button>
          </div>
        ))}
      </div>
    </ConvoHistoryContainer>
  );
};

export default MessageInboxConvoHistory;

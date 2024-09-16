import { useEffect, useState } from "react";
import {
  ConvoHistoryContainer,
  ReadFilterWrapper,
} from "./MessageInboxConvoHistory.styled";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { Conversation } from "../../../../types/Conversations";
import SentMessages from "./SentMessages/SentMessages";
import { handleTokenExpiration } from "../../../../services/tokenService";

const BASE_URL = "http://localhost:5000";

const MessageInboxConvoHistory: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
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
        console.log(data);

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
      <SearchBar></SearchBar>
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
            <button onClick={() => setSelectedConversationId(conversation.id)}>
              Open Conversation
            </button>
          </div>
        ))}
      </div>

      {selectedConversationId && (
        <div>
          <h3>Messages in Conversation {selectedConversationId}</h3>
          <SentMessages conversationId={selectedConversationId} />
        </div>
      )}
    </ConvoHistoryContainer>
  );
};

export default MessageInboxConvoHistory;

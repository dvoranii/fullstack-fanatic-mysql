import { useContext, useEffect, useState } from "react";
import {
  LayoutContainer,
  RightContainer,
  MessageInboxPageWrapper,
} from "./MessageInboxLayout.styled";
import MessageInboxSidebar from "./MessageInboxSidebar/MessageInboxSidebar";
import MessageInboxConvoHistory from "./MessageInboxConvoHistory/MessageInboxConvoHistory";
import MessageInboxChatWindow from "./MessageInboxChatWindow/MessageInboxChatWindow";
import { useNotificationHandler } from "../../../hooks/useNotificationHandler";
import {
  updateConversationReadStatus,
  fetchConversations,
} from "../../../services/conversationService";
import { Conversation } from "../../../types/Conversations";
import { UserContext } from "../../../context/UserContext";

const MessageInboxLayout: React.FC = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;

  const { markNotificationsAsRead } = useNotificationHandler();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const data = await fetchConversations();
        console.log("Fetched Conversations:", data);
        setConversations(data);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };

    getConversations();
  }, []);

  const handleConversationSelect = async (conversationId: number) => {
    // Mark the conversation as read locally
    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              is_read_user1:
                loggedInUserId === conversation.user1_id
                  ? true
                  : conversation.is_read_user1,
              is_read_user2:
                loggedInUserId === conversation.user2_id
                  ? true
                  : conversation.is_read_user2,
            }
          : conversation
      )
    );

    try {
      await markNotificationsAsRead(conversationId);
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }

    setSelectedConversationId(conversationId);

    try {
      await updateConversationReadStatus(conversationId);
    } catch (error) {
      console.error("Failed to update conversation read status:", error);
    }
  };

  const clearSelectedConversation = () => {
    setSelectedConversationId(null);
  };
  return (
    <div style={{ background: "#eee" }}>
      <MessageInboxPageWrapper>
        <LayoutContainer>
          <MessageInboxSidebar />
          <RightContainer>
            <MessageInboxConvoHistory
              conversations={conversations}
              setConversations={setConversations}
              onConversationSelect={handleConversationSelect}
              onConversationDelete={clearSelectedConversation}
            />

            <MessageInboxChatWindow
              conversationId={selectedConversationId}
              onConversationSelect={handleConversationSelect}
              onClearConversation={clearSelectedConversation}
            />
          </RightContainer>
        </LayoutContainer>
      </MessageInboxPageWrapper>
    </div>
  );
};

export default MessageInboxLayout;

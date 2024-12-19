import { useContext, useEffect, useState } from "react";
import {
  LayoutContainer,
  RightContainer,
  MessageInboxPageWrapper,
} from "./MessageInboxLayout.styled";
import MessageInboxSidebar from "./MessageInboxSidebar/MessageInboxSidebar";
import MessageInboxConvoHistory from "./MessageInboxConvoHistory/MessageInboxConvoHistory";
import MessageInboxChatWindow from "./MessageInboxChatWindow/MessageInboxChatWindow";
import { useNotifications } from "../../../hooks/useNotifications";
import {
  updateConversationReadStatus,
  fetchConversations,
  fetchConversationById,
} from "../../../services/conversationService";
import { Conversation } from "../../../types/Conversations";
import { UserContext } from "../../../context/UserContext";
import { getUserPublicProfile } from "../../../services/profileService";
import { useCsrfToken } from "../../../hooks/useCsrfToken";

const MessageInboxLayout: React.FC = () => {
  const csrfToken = useCsrfToken();
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [receiverName, setReceiverName] = useState<string>("");

  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;

  const { markNotificationAsReadById } = useNotifications();

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
      await markNotificationAsReadById(conversationId);
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }

    setSelectedConversationId(conversationId);

    try {
      await updateConversationReadStatus(conversationId, csrfToken);

      const conversation = await fetchConversationById(conversationId);
      if (conversation) {
        const receiverId =
          loggedInUserId === conversation.user1_id
            ? conversation.user2_id
            : conversation.user1_id;
        const receiverProfile = await getUserPublicProfile(
          receiverId.toString()
        );

        setReceiverName(receiverProfile.user.name);
      }
    } catch (error) {
      console.error("Failed to update conversation read status:", error);
    }
  };

  const clearSelectedConversation = () => {
    setSelectedConversationId(null);
    setReceiverName("");
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
              receiverName={receiverName}
              onConversationSelect={handleConversationSelect}
              onClearConversation={clearSelectedConversation}
            />
          </RightContainer>
        </LayoutContainer>
      </MessageInboxPageWrapper>
      <div style={{ height: "0" }}>&nbsp;</div>
    </div>
  );
};

export default MessageInboxLayout;

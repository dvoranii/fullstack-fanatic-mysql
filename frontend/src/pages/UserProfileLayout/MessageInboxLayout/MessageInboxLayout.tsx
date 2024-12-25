import { useContext, useState } from "react";
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
  fetchConversationById,
} from "../../../services/conversationService";
import { UserContext } from "../../../context/UserContext";
import { useCsrfToken } from "../../../hooks/useCsrfToken";

const MessageInboxLayout: React.FC = () => {
  const csrfToken = useCsrfToken();
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [receiverName, setReceiverName] = useState<string>("");

  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;

  const { markNotificationAsReadById } = useNotifications();

  const handleConversationSelect = async (conversationId: number) => {
    try {
      await markNotificationAsReadById(conversationId);
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }

    setSelectedConversationId(conversationId);

    try {
      await updateConversationReadStatus(conversationId, csrfToken);

      const conversation = await fetchConversationById(conversationId);
      console.log(conversation);
      if (conversation) {
        const receiverName =
          loggedInUserId === conversation.user1_id
            ? conversation.user2_name
            : conversation.user1_name;
        setReceiverName(receiverName || "Unknown User");
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

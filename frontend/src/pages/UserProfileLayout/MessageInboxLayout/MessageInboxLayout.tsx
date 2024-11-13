import { useState } from "react";
import {
  LayoutContainer,
  RightContainer,
  MessageInboxPageWrapper,
} from "./MessageInboxLayout.styled";
import MessageInboxSidebar from "./MessageInboxSidebar/MessageInboxSidebar";
import MessageInboxConvoHistory from "./MessageInboxConvoHistory/MessageInboxConvoHistory";
import MessageInboxChatWindow from "./MessageInboxChatWindow/MessageInboxChatWindow";

const MessageInboxLayout: React.FC = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

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
              onConversationSelect={setSelectedConversationId}
              onConversationDelete={clearSelectedConversation}
            />

            <MessageInboxChatWindow conversationId={selectedConversationId} />
          </RightContainer>
        </LayoutContainer>
      </MessageInboxPageWrapper>
    </div>
  );
};

export default MessageInboxLayout;

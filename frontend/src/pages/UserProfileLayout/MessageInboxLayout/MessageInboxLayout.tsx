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

  return (
    <div style={{ background: "#eee" }}>
      <MessageInboxPageWrapper>
        <LayoutContainer>
          <MessageInboxSidebar />
          <RightContainer>
            <MessageInboxConvoHistory
              onConversationSelect={setSelectedConversationId}
            />

            <MessageInboxChatWindow conversationId={selectedConversationId} />
          </RightContainer>
        </LayoutContainer>
      </MessageInboxPageWrapper>
    </div>
  );
};

export default MessageInboxLayout;

import { useState } from "react";
import { LayoutContainer, RightContainer } from "./MessageInboxLayout.styled";
import { PageWrapper } from "../../../PageWrapper.styled";
import MessageInboxSidebar from "./MessageInboxSidebar/MessageInboxSidebar";
import MessageInboxConvoHistory from "./MessageInboxConvoHistory/MessageInboxConvoHistory";
import MessageInboxChatWindow from "./MessageInboxChatWindow/MessageInboxChatWindow";

const MessageInboxLayout: React.FC = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

  return (
    <div style={{ background: "#eee" }}>
      <PageWrapper>
        <LayoutContainer>
          <MessageInboxSidebar />
          <RightContainer>
            <MessageInboxConvoHistory
              onConversationSelect={setSelectedConversationId}
            />

            <MessageInboxChatWindow conversationId={selectedConversationId} />
          </RightContainer>
        </LayoutContainer>
      </PageWrapper>
    </div>
  );
};

export default MessageInboxLayout;

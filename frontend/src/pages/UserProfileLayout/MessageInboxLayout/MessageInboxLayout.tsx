import { useContext, useState } from "react";
import {
  LayoutContainer,
  RightContainer,
  MessageInboxPageWrapper,
} from "./MessageInboxLayout.styled";
// import { PageWrapper } from "../../../PageWrapper.styled";
import MessageInboxSidebar from "./MessageInboxSidebar/MessageInboxSidebar";
import MessageInboxConvoHistory from "./MessageInboxConvoHistory/MessageInboxConvoHistory";
import MessageInboxChatWindow from "./MessageInboxChatWindow/MessageInboxChatWindow";
import { UserContext } from "../../../context/UserContext";
// import { getUserPublicProfile } from "../../../services/userService";

const MessageInboxLayout: React.FC = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

  const profile = useContext(UserContext);
  const userId = profile?.profile?.id.toString();

  return (
    <div style={{ background: "#eee" }}>
      <MessageInboxPageWrapper>
        <LayoutContainer>
          <MessageInboxSidebar />
          <RightContainer>
            <MessageInboxConvoHistory
              onConversationSelect={setSelectedConversationId}
            />

            <MessageInboxChatWindow
              conversationId={selectedConversationId}
              userId={userId || ""}
            />
          </RightContainer>
        </LayoutContainer>
      </MessageInboxPageWrapper>
    </div>
  );
};

export default MessageInboxLayout;

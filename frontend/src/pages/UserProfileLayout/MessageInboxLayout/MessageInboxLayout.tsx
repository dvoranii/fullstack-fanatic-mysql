import {
  LayoutContainer,
  // MainContent,
  RightContainer,
} from "./MessageInboxLayout.styled";
import { PageWrapper } from "../../../PageWrapper.styled";
import MessageInboxSidebar from "./MessageInboxSidebar/MessageInboxSidebar";
import MessageInboxConvoHistory from "./MessageInboxConvoHistory/MessageInboxConvoHistory";
import MessageInboxChatWindow from "./MessageInboxChatWindow/MessageInboxChatWindow";

const MessageInboxLayout: React.FC = () => {
  return (
    <div style={{ background: "#eee" }}>
      <PageWrapper>
        <LayoutContainer>
          <MessageInboxSidebar />
          <RightContainer>
            <MessageInboxConvoHistory />
            <MessageInboxChatWindow />
          </RightContainer>
        </LayoutContainer>
      </PageWrapper>
    </div>
  );
};

export default MessageInboxLayout;

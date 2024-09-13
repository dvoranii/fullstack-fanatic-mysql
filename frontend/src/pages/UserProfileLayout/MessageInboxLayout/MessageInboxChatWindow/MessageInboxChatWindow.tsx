import React from "react";
import {
  ChatWindowContainerOuter,
  ChatInput,
  ChatSubmitButton,
  NewChatBar,
  NewChatBarWrapper,
  TextInputWrapper,
  ChatWindowContainerInner,
} from "./MessageInboxChatWindow.styled";
import PlusIcon from "../../../../assets/images/account/plus-icon.png";

const MessageInboxChatWindow: React.FC = () => {
  return (
    <ChatWindowContainerOuter>
      <NewChatBarWrapper>
        <NewChatBar>
          New Chat <img src={PlusIcon} alt="" />
        </NewChatBar>
      </NewChatBarWrapper>

      <ChatWindowContainerInner></ChatWindowContainerInner>

      <TextInputWrapper>
        <ChatInput />
        <ChatSubmitButton>Send</ChatSubmitButton>
      </TextInputWrapper>
    </ChatWindowContainerOuter>
  );
};

export default MessageInboxChatWindow;

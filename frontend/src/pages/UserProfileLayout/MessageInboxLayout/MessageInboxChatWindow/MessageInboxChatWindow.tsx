import React, { useState } from "react";
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
import SentMessages from "../MessageInboxConvoHistory/SentMessages/SentMessages"; // Component to display messages
import { handleTokenExpiration } from "../../../../services/tokenService";

interface MessageInboxChatWindowProps {
  conversationId: number | null;
}

const BASE_URL = "http://localhost:5000";

const MessageInboxChatWindow: React.FC<MessageInboxChatWindowProps> = ({
  conversationId,
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (!conversationId) return;
    const token = await handleTokenExpiration();
    try {
      await fetch(`${BASE_URL}/api/messages/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          content: newMessage,
        }),
      });
      setNewMessage(""); // Clear input after sending
      // Optionally refetch messages here
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <ChatWindowContainerOuter>
      <NewChatBarWrapper>
        <NewChatBar>
          {conversationId
            ? `Chat in conversation ${conversationId}`
            : "No conversation selected"}
          <img src={PlusIcon} alt="" />
        </NewChatBar>
      </NewChatBarWrapper>

      <ChatWindowContainerInner>
        {conversationId && <SentMessages conversationId={conversationId} />}
      </ChatWindowContainerInner>

      {conversationId && (
        <TextInputWrapper>
          <ChatInput
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <ChatSubmitButton onClick={handleSendMessage}>Send</ChatSubmitButton>
        </TextInputWrapper>
      )}
    </ChatWindowContainerOuter>
  );
};

export default MessageInboxChatWindow;

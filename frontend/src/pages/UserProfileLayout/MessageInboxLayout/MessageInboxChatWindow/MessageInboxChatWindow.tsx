import React, { useContext, useState } from "react";
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
import SentMessages from "./SentMessages/SentMessages";
import { handleTokenExpiration } from "../../../../services/tokenService";
import { UserContext } from "../../../../context/UserContext";

interface MessageInboxChatWindowProps {
  conversationId: number | null;
  userId: string;
}

const BASE_URL = "http://localhost:5000";

const MessageInboxChatWindow: React.FC<MessageInboxChatWindowProps> = ({
  conversationId,
  userId,
}) => {
  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;

  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = async () => {
    if (!conversationId || newMessage.trim() === "") return;

    const token = await handleTokenExpiration();

    try {
      const messageResponse = await fetch(`${BASE_URL}/api/messages/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          sender_id: loggedInUserId,
          receiver_id: userId,
          content: newMessage,
        }),
      });

      const sentMessage = await messageResponse.json();
      console.log("Message sent:", sentMessage);

      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // need to figure out real-time update for sending messages so it is
  // immediately visible in the chat window
  return (
    <ChatWindowContainerOuter>
      {!conversationId && (
        <NewChatBarWrapper>
          <NewChatBar>
            New Chat <img src={PlusIcon} alt="" />
          </NewChatBar>
        </NewChatBarWrapper>
      )}

      {conversationId && (
        <ChatWindowContainerInner>
          <SentMessages conversationId={conversationId} />
        </ChatWindowContainerInner>
      )}

      <TextInputWrapper>
        <ChatInput
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <ChatSubmitButton onClick={handleSendMessage}>Send</ChatSubmitButton>
      </TextInputWrapper>
    </ChatWindowContainerOuter>
  );
};

export default MessageInboxChatWindow;

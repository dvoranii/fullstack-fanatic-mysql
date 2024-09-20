import React, { useContext, useState, useEffect } from "react";
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
import { io } from "socket.io-client";
import { Message } from "../../../../types/Message";

interface MessageInboxChatWindowProps {
  conversationId: number | null;
  userId: string;
}

const BASE_URL = "http://localhost:5000";
const socket = io(BASE_URL);

const MessageInboxChatWindow: React.FC<MessageInboxChatWindowProps> = ({
  conversationId,
  userId,
}) => {
  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;

  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (conversationId) {
        const token = await handleTokenExpiration();
        const response = await fetch(
          `${BASE_URL}/api/messages/${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setMessages(data);
      }
    };

    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    if (conversationId) {
      socket.on("newMessage", (message) => {
        console.log("New message received: ", message);
        if (message.conversation_id === conversationId) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [conversationId]);

  const handleSendMessage = async () => {
    if (!conversationId || newMessage.trim() === "") return;

    const tempMessage: Message = {
      id: Date.now(),
      conversation_id: conversationId,
      sender_id: Number(loggedInUserId),
      receiver_id: Number(userId),
      subject: "",
      content: newMessage,
      // is_read: false,
      sent_at: String(new Date()),
    };

    setMessages((prevMessages) => [...prevMessages, tempMessage]);

    const token = await handleTokenExpiration();

    try {
      const messageResponse = await fetch(`${BASE_URL}/api/messages`, {
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
          <SentMessages messages={messages} />
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

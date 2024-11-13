import React, { useContext, useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  ChatWindowContainerOuter,
  ChatInput,
  ChatSubmitButton,
  NewChatBarWrapper,
  TextInputWrapper,
  ChatWindowContainerInner,
  NewChatBar,
} from "./MessageInboxChatWindow.styled";
import SentMessages from "./SentMessages/SentMessages";
import { UserContext } from "../../../../context/UserContext";
import { io } from "socket.io-client";
import { Message } from "../../../../types/Message";
import {
  getMessagesForConversation,
  sendMessage,
} from "../../../../services/messageService";

interface MessageInboxChatWindowProps {
  conversationId: number | null;
}

const BASE_URL = "http://localhost:5000";
const socket = io(BASE_URL);

const MessageInboxChatWindow: React.FC<MessageInboxChatWindowProps> = ({
  conversationId,
}) => {
  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Function to fetch initial set of messages (most recent 10)
  const fetchInitialMessages = async () => {
    if (!conversationId) return;
    try {
      const initialMessages = await getMessagesForConversation(
        conversationId,
        1,
        10
      );
      setMessages(initialMessages.reverse()); // Reverse to display oldest-to-newest
      setPage(2);
      scrollToBottom();
    } catch (error) {
      console.error("Failed to fetch messages: ", error);
    }
  };

  // Function to fetch older messages on scroll
  const fetchOlderMessages = async () => {
    if (!conversationId) return;
    try {
      const olderMessages = await getMessagesForConversation(
        conversationId,
        page,
        10
      );
      if (olderMessages.length === 0) {
        setHasMore(false);
      } else {
        setMessages((prevMessages) => [
          ...olderMessages.reverse(),
          ...prevMessages,
        ]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Failed to load more messages:", error);
    }
  };

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo(
        0,
        chatContainerRef.current.scrollHeight
      );
    }
  };

  // Load initial messages when component mounts or conversationId changes
  useEffect(() => {
    fetchInitialMessages();
  }, [conversationId]);

  // Socket listener for new messages
  useEffect(() => {
    if (conversationId) {
      socket.on("newMessage", (message) => {
        if (message.conversation_id === conversationId) {
          setMessages((prevMessages) => [...prevMessages, message]);
          scrollToBottom(); // Scroll to the latest message
        }
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [conversationId]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!conversationId || !newMessage.trim()) return;
    const tempMessage: Message = {
      id: Date.now(),
      conversation_id: conversationId,
      sender_id: Number(loggedInUserId),
      receiver_id: conversationId,
      subject: "",
      content: newMessage,
      sent_at: String(new Date()),
    };
    setMessages((prevMessages) => [...prevMessages, tempMessage]);
    scrollToBottom();
    try {
      await sendMessage(
        conversationId,
        Number(loggedInUserId),
        conversationId,
        newMessage
      ); // Adjust params as needed
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <ChatWindowContainerOuter>
      {!conversationId && (
        <NewChatBarWrapper>
          <NewChatBar>New Chat</NewChatBar>
        </NewChatBarWrapper>
      )}

      {conversationId && (
        <ChatWindowContainerInner
          ref={chatContainerRef}
          id="scrollableDiv"
          style={{ display: "flex", flexDirection: "column-reverse" }}
        >
          <InfiniteScroll
            dataLength={messages.length}
            next={fetchOlderMessages} // Load older messages on scroll
            hasMore={hasMore}
            inverse={true} // Enable reverse scroll
            loader={""}
            scrollableTarget="scrollableDiv"
          >
            <SentMessages messages={messages} />
          </InfiniteScroll>
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

import React, { useContext, useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
import { UserContext } from "../../../../context/UserContext";
import { io } from "socket.io-client";
import { Message } from "../../../../types/Message";
import {
  getMessagesForConversation,
  sendMessage,
} from "../../../../services/messageService";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const loadMoreMessages = async () => {
    if (!conversationId) return;

    try {
      const newMessages = await getMessagesForConversation(
        conversationId,
        page,
        10
      );

      // Prepend new messages at the beginning of the list to maintain order
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);

      if (newMessages.length === 0) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Failed to load more messages:", error);
    }
  };

  useEffect(() => {
    const fetchInitialMessages = async () => {
      if (conversationId) {
        try {
          const initialMessages = await getMessagesForConversation(
            conversationId,
            1
          );
          console.log("Initial messages:", initialMessages);
          setMessages(initialMessages);
          setPage(2);
        } catch (error) {
          console.error("Failed to fetch messages: ", error);
        }
      }
    };
    fetchInitialMessages();
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

    // Optimistically update the UI with the new message
    const tempMessage: Message = {
      id: Date.now(),
      conversation_id: conversationId,
      sender_id: Number(loggedInUserId),
      receiver_id: Number(userId),
      subject: "",
      content: newMessage,
      sent_at: String(new Date()),
    };

    setMessages((prevMessages) => [...prevMessages, tempMessage]);

    try {
      await sendMessage(
        conversationId,
        Number(loggedInUserId),
        Number(userId),
        newMessage
      );
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
        <ChatWindowContainerInner ref={chatContainerRef} id="scrollableDiv">
          <InfiniteScroll
            dataLength={messages.length}
            next={loadMoreMessages}
            hasMore={hasMore}
            scrollableTarget="scrollableDiv"
            loader={<LoadingSpinner />}
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

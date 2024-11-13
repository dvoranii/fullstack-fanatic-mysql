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
import { fetchConversationById } from "../../../../services/conversationService";

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
  const [receiverId, setReceiverId] = useState<number | null>(null);

  const fetchInitialMessages = async () => {
    if (!conversationId) return;
    try {
      const initialMessages = await getMessagesForConversation(
        conversationId,
        1,
        10
      );
      setMessages(initialMessages.reverse());
      setPage(2);
      scrollToBottom();
    } catch (error) {
      console.error("Failed to fetch messages: ", error);
    }
  };

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

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo(
        0,
        chatContainerRef.current.scrollHeight
      );
    }
  };

  useEffect(() => {
    setMessages([]);
    setPage(1);
    setHasMore(true);
    fetchInitialMessages();
  }, [conversationId]);

  useEffect(() => {
    if (conversationId) {
      socket.on("newMessage", (message) => {
        if (message.conversation_id === conversationId) {
          setMessages((prevMessages) => [...prevMessages, message]);
          scrollToBottom();
        }
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [conversationId]);

  useEffect(() => {
    const determineReceiver = async () => {
      if (conversationId && loggedInUserId) {
        const conversation = await fetchConversationById(conversationId);
        if (conversation) {
          const determinedReceiverId =
            conversation.user1_id === loggedInUserId
              ? conversation.user2_id
              : conversation.user1_id;
          setReceiverId(determinedReceiverId);
        }
      }
    };

    determineReceiver();
  }, [conversationId, loggedInUserId]);

  const handleSendMessage = async () => {
    if (!conversationId || !newMessage.trim()) return;

    if (!receiverId) {
      console.error("Receiver ID is not set");
      return;
    }

    const tempMessage: Message = {
      id: Date.now(),
      conversation_id: conversationId,
      sender_id: Number(loggedInUserId),
      receiver_id: receiverId,
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
        receiverId,
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
            next={fetchOlderMessages}
            hasMore={hasMore}
            inverse={true}
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

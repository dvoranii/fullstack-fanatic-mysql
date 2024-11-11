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
import { fetchConversationById } from "../../../../services/conversationService";

interface MessageInboxChatWindowProps {
  conversationId: number | null;
  userId: string;
}

const BASE_URL = "http://localhost:5000";
const socket = io(BASE_URL);

const MessageInboxChatWindow: React.FC<MessageInboxChatWindowProps> = ({
  conversationId,
  // userId,
}) => {
  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;
  const [receiverId, setReceiverId] = useState<number | null>(null);

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

  // determine receiver
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
    if (!conversationId || !receiverId || newMessage.trim() === "") return;

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
            loader="none"
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

import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  ChatWindowContainerOuter,
  ChatInput,
  ChatSubmitButton,
  NewChatBarWrapperInner,
  NewChatBarWrapperOuter,
  TextInputWrapper,
  ChatWindowContainerInner,
  NewChatBar,
  ChatHeader,
  ClearButtonWrapper,
  EmojiPickerButton,
  ButtonsWrapper,
  PickerWrapper,
} from "./MessageInboxChatWindow.styled";
import SentMessages from "./SentMessages/SentMessages";
import { UserContext } from "../../../../context/UserContext";
import { Message } from "../../../../types/Message";
import {
  getMessagesForConversation,
  sendMessage,
} from "../../../../services/messageService";
import {
  checkExistingConversation,
  createOrGetConversation,
  fetchConversationById,
} from "../../../../services/conversationService";
import NewChatDropdown from "../NewChatDropdown/NewChatDropdown";
import useClickOutside from "../../../../hooks/useClickOutside";
import { User } from "../../../../types/User/User";
import { useCsrfToken } from "../../../../hooks/useCsrfToken";
import { useWebSocketMessages } from "../../../../hooks/useWebSocketMessages";

const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

interface MessageInboxChatWindowProps {
  conversationId: number | null;
  receiverName: string;
  onConversationSelect: (conversationId: number) => void;
  onClearConversation: () => void;
}

const MessageInboxChatWindow: React.FC<MessageInboxChatWindowProps> = ({
  conversationId,
  receiverName,
  onConversationSelect,
  onClearConversation,
}) => {
  const csrfToken = useCsrfToken();
  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [receiverId, setReceiverId] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const [newMessage, setNewMessage] = useState<string>("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [Picker, setPicker] = useState<React.ComponentType<{
    onEmojiClick: (emojiObject: EmojiClickData) => void;
  }> | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  type EmojiClickData = import("emoji-picker-react").EmojiClickData;

  const handleShowEmojiPicker = async () => {
    if (!Picker) {
      try {
        const { default: PickerComponent } = await import("emoji-picker-react");
        setPicker(() => PickerComponent);
      } catch (error) {
        console.error("Failed to load emoji picker:", error);
      }
    }
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  useClickOutside(containerRef, () => setDropdownVisible(false));
  useClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

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

  const handleUserSelect = async (user: User) => {
    if (!profile?.id) return;

    try {
      const { exists, id } = await checkExistingConversation(
        profile.id,
        user.id
      );

      if (exists && id) {
        onConversationSelect(id);
      } else {
        const newConversation = await createOrGetConversation(
          profile.id,
          user.id,
          "",
          csrfToken
        );
        onConversationSelect(newConversation.id);
      }

      setDropdownVisible(false);
    } catch (error) {
      console.error("Error handling user selection:", error);
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

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    setMessages([]);
    setPage(1);
    setHasMore(true);
    fetchInitialMessages();
  }, [conversationId]);

  const onNewMessageHandler = useCallback(
    (message: Message) => {
      if (message.conversation_id === conversationId) {
        setMessages((prevMessages) => [...prevMessages, message]);
        scrollToBottom();
      }
    },
    [conversationId, scrollToBottom]
  );

  const normalizedUserId: number | null = loggedInUserId ?? null;

  useWebSocketMessages(
    onNewMessageHandler,
    conversationId,
    normalizedUserId,
    BASE_URL
  );

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
      sender_picture: "",
      sender_name: "",
      receiver_picture: "",
      receiver_name: "",
    };

    setMessages((prevMessages) => [...prevMessages, tempMessage]);
    scrollToBottom();

    try {
      await sendMessage(
        conversationId,
        Number(loggedInUserId),
        receiverId,
        newMessage,
        csrfToken
      );
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <ChatWindowContainerOuter>
      {!conversationId && (
        <NewChatBarWrapperOuter>
          <NewChatBarWrapperInner ref={containerRef}>
            <NewChatBar onClick={toggleDropdown}>
              New Chat
              <img src="/assets/images/account/plus-icon.png" alt="plus icon" />
            </NewChatBar>
            <NewChatDropdown
              isVisible={isDropdownVisible}
              onUserSelect={handleUserSelect}
            />
          </NewChatBarWrapperInner>
        </NewChatBarWrapperOuter>
      )}

      {conversationId && (
        <>
          <ChatHeader>
            <h3>{receiverName}</h3>
            <ClearButtonWrapper>
              <button onClick={onClearConversation}>×</button>
            </ClearButtonWrapper>
          </ChatHeader>
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
        </>
      )}

      <TextInputWrapper>
        <ChatInput
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <ButtonsWrapper>
          <EmojiPickerButton onClick={handleShowEmojiPicker}>
            😀
          </EmojiPickerButton>
          {showEmojiPicker && Picker && (
            <PickerWrapper ref={emojiPickerRef}>
              <Picker onEmojiClick={handleEmojiClick} />
            </PickerWrapper>
          )}
          <ChatSubmitButton onClick={handleSendMessage}>Send</ChatSubmitButton>
        </ButtonsWrapper>
      </TextInputWrapper>
    </ChatWindowContainerOuter>
  );
};

export default MessageInboxChatWindow;

import { useEffect, useState, useContext } from "react";
import {
  ConvoHistoryContainer,
  ReadFilterWrapper,
  SearchBarReadFilterWrapper,
} from "./MessageInboxConvoHistory.styled";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import DeleteConfirmationModal from "../../../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import { UserContext } from "../../../../context/UserContext";
import { useConversations } from "../../../../hooks/useConversations";
import { useNotificationHandler } from "../../../../hooks/useNotificationHandler";
import { Conversation } from "../../../../types/Conversations";
import { deleteConversation } from "../../../../services/conversationService";
import ConversationItem from "./ConversationItem/ConversationItem";

interface MessageInboxConvoHistoryProps {
  onConversationSelect: (conversationId: number) => void;
  onConversationDelete: () => void;
}

const MessageInboxConvoHistory: React.FC<MessageInboxConvoHistoryProps> = ({
  onConversationSelect,
  onConversationDelete,
}) => {
  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;

  // Use custom hook to get conversations and user details
  const { conversations, setConversations, userNames, userPictures } =
    useConversations(loggedInUserId);

  const { markNotificationsAsRead } = useNotificationHandler();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [boldSpan, setBoldSpan] = useState("read");
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unreadConversations = conversations.filter(
      (conversation: Conversation) =>
        (loggedInUserId === conversation.user1_id &&
          !conversation.is_read_user1) ||
        (loggedInUserId === conversation.user2_id &&
          !conversation.is_read_user2)
    );

    setUnreadCount(unreadConversations.length);
  }, [conversations, loggedInUserId]);

  const filteredConversations = (): Conversation[] => {
    return conversations.filter((conversation: Conversation) => {
      const matchesReadFilter =
        boldSpan === "read"
          ? (loggedInUserId === conversation.user1_id &&
              conversation.is_read_user1) ||
            (loggedInUserId === conversation.user2_id &&
              conversation.is_read_user2)
          : (loggedInUserId === conversation.user1_id &&
              !conversation.is_read_user1) ||
            (loggedInUserId === conversation.user2_id &&
              !conversation.is_read_user2);

      const matchesSearchTerm =
        conversation.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (userNames[conversation.id] || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesReadFilter && matchesSearchTerm;
    });
  };

  const handleConversationSelect = async (conversationId: number) => {
    // Marking the conversation as read locally
    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              is_read_user1:
                loggedInUserId === conversation.user1_id
                  ? true
                  : conversation.is_read_user1,
              is_read_user2:
                loggedInUserId === conversation.user2_id
                  ? true
                  : conversation.is_read_user2,
            }
          : conversation
      )
    );

    await markNotificationsAsRead(conversationId);

    onConversationSelect(conversationId);
  };

  const handleDeleteConversationClick = (conversationId: number) => {
    setSelectedConversationId(conversationId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedConversationId === null) return;

    setConversations((prevConversations) =>
      prevConversations.filter((conv) => conv.id !== selectedConversationId)
    );

    try {
      await deleteConversation(selectedConversationId);
      onConversationDelete();
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedConversationId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedConversationId(null);
  };

  return (
    <>
      <ConvoHistoryContainer>
        <SearchBarReadFilterWrapper>
          <SearchBar
            width="100%"
            paddingLeft="0"
            onChange={(value) => setSearchTerm(value)}
          />
          <ReadFilterWrapper>
            <p>
              <span
                onClick={() => setBoldSpan("read")}
                className={boldSpan === "read" ? "bold" : "normal"}
              >
                READ
              </span>
              &nbsp;|&nbsp;
              <span
                onClick={() => setBoldSpan("unread")}
                className={boldSpan === "unread" ? "bold" : "normal"}
              >
                UNREAD {unreadCount > 0 && <span>({unreadCount})</span>}
              </span>
            </p>
          </ReadFilterWrapper>
        </SearchBarReadFilterWrapper>

        {filteredConversations().map((conversation: Conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            userName={
              userNames[conversation.id] || `User ${conversation.user2_id}`
            }
            userPicture={userPictures[conversation.id] || ""}
            onSelect={handleConversationSelect}
            onDelete={handleDeleteConversationClick}
          />
        ))}
      </ConvoHistoryContainer>

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          message="Are you sure you want to delete this conversation?"
        />
      )}
    </>
  );
};

export default MessageInboxConvoHistory;

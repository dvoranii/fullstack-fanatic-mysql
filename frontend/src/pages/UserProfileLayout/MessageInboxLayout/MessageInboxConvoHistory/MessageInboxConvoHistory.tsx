import { useEffect, useState, useContext, useCallback } from "react";
import {
  ConvoHistoryContainer,
  ReadFilterWrapper,
  ConversationWrapper,
  ProfilePictureWrapper,
  ConversationDetailsWrapper,
  SubjectPreview,
  SearchBarReadFilterWrapper,
  DeleteConvoButtonWrapper,
} from "./MessageInboxConvoHistory.styled";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { Conversation } from "../../../../types/Conversations";
import { UserContext } from "../../../../context/UserContext";
import {
  fetchConversations,
  updateConversationReadStatus,
  deleteConversation,
} from "../../../../services/conversationService";
import { fetchUserNamesAndPictures } from "../../../../services/userService";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";
import DiscardIcon from "../../../../assets/images/discard-icon.png";
import DeleteConfirmationModal from "../../../../components/DeleteConfirmationModal/DeleteConfirmationModal";

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

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

  const [userNames, setUserNames] = useState<{ [key: number]: string }>({});
  const [userPictures, setUserPictures] = useState<{ [key: number]: string }>(
    {}
  );
  const [boldSpan, setBoldSpan] = useState("read");
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUserDetails = useCallback(
    async (conversations: Conversation[]) => {
      try {
        const { userNames, userPictures } = await fetchUserNamesAndPictures(
          conversations,
          loggedInUserId
        );
        setUserNames(userNames);
        setUserPictures(userPictures);
      } catch (error) {
        console.error("Failed to fetch user profiles", error);
      }
    },
    [loggedInUserId]
  );

  useEffect(() => {
    const getConversations = async () => {
      try {
        const data = await fetchConversations();
        setConversations(data);
        fetchUserDetails(data);

        const unreadConversations = data.filter(
          (conversation: Conversation) => {
            return (
              (loggedInUserId === conversation.user1_id &&
                !conversation.is_read_user1) ||
              (loggedInUserId === conversation.user2_id &&
                !conversation.is_read_user2)
            );
          }
        );

        setUnreadCount(unreadConversations.length);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
        setConversations([]);
      }
    };

    getConversations();
  }, [fetchUserDetails, loggedInUserId]);

  const toggleBold = (selectedSpan: string) => {
    setBoldSpan(selectedSpan);
  };

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

    const selectedConversation = conversations.find(
      (conversation) => conversation.id === conversationId
    );
    if (
      selectedConversation &&
      ((loggedInUserId === selectedConversation.user1_id &&
        !selectedConversation.is_read_user1) ||
        (loggedInUserId === selectedConversation.user2_id &&
          !selectedConversation.is_read_user2))
    ) {
      setUnreadCount((prevCount) => prevCount - 1);
    }

    try {
      await updateConversationReadStatus(conversationId);
    } catch (error) {
      console.error("Failed to update conversation as read:", error);
    }

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
      console.log("Conversation deleted for current user");
      onConversationDelete();
    } catch (error) {
      console.error("Failed to delete conversation:", error);
      setConversations((prevConversations) => [
        ...prevConversations,
        conversations.find((conv) => conv.id === selectedConversationId)!,
      ]);
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
                onClick={() => toggleBold("read")}
                className={boldSpan === "read" ? "bold" : "normal"}
              >
                READ
              </span>
              &nbsp;|&nbsp;
              <span
                onClick={() => toggleBold("unread")}
                className={boldSpan === "unread" ? "bold" : "normal"}
              >
                UNREAD {unreadCount > 0 && <span>({unreadCount})</span>}
              </span>
            </p>
          </ReadFilterWrapper>
        </SearchBarReadFilterWrapper>

        {filteredConversations().map((conversation: Conversation) => (
          <ConversationWrapper
            key={conversation.id}
            onClick={() => handleConversationSelect(conversation.id)}
          >
            <ProfilePictureWrapper>
              <ProfilePicture
                src={userPictures[conversation.id] || ""}
                alt="User Profile Picture"
                width="45px"
                border="2px solid #ccc"
                bg="#ffffff"
              />
            </ProfilePictureWrapper>

            <ConversationDetailsWrapper>
              <p>
                {userNames[conversation.id] || `User ${conversation.user2_id}`}
              </p>
              <SubjectPreview>
                {conversation.subject || "No subject"}
              </SubjectPreview>
            </ConversationDetailsWrapper>

            <DeleteConvoButtonWrapper>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteConversationClick(conversation.id);
                }}
              >
                <img
                  src={DiscardIcon}
                  alt="Delete Conversation"
                  title="Delete"
                />
              </button>
            </DeleteConvoButtonWrapper>
          </ConversationWrapper>
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

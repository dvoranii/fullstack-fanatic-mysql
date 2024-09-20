import { useEffect, useState, useContext, useCallback } from "react";
import {
  ConvoHistoryContainer,
  ReadFilterWrapper,
  ConversationWrapper,
  ProfilePictureWrapper,
  ConversationDetailsWrapper,
  SubjectPreview,
} from "./MessageInboxConvoHistory.styled";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { Conversation } from "../../../../types/Conversations";
import { UserContext } from "../../../../context/UserContext";
import { fetchConversations } from "../../../../services/messageService";
import { fetchUserNamesAndPictures } from "../../../../services/userService";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";

interface MessageInboxConvoHistoryProps {
  onConversationSelect: (conversationId: number) => void;
}

const MessageInboxConvoHistory: React.FC<MessageInboxConvoHistoryProps> = ({
  onConversationSelect,
}) => {
  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [userNames, setUserNames] = useState<{ [key: number]: string }>({});
  const [userPictures, setUserPictures] = useState<{ [key: number]: string }>(
    {}
  );
  const [boldSpan, setBoldSpan] = useState("read");

  // Use useCallback to memoize the function and prevent unnecessary re-renders
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
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
        setConversations([]);
      }
    };

    getConversations();
  }, [fetchUserDetails]);

  const toggleBold = (selectedSpan: string) => {
    setBoldSpan(selectedSpan);
  };

  const filteredConversations = (): Conversation[] => {
    return conversations.filter((conversation: Conversation) => {
      return boldSpan === "read"
        ? conversation.is_read === 1
        : conversation.is_read === 0;
    });
  };

  const handleConversationSelect = (conversationId: number) => {
    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, is_read: 1 }
          : conversation
      )
    );

    onConversationSelect(conversationId);
  };

  return (
    <ConvoHistoryContainer>
      <SearchBar />
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
            UNREAD
          </span>
        </p>
      </ReadFilterWrapper>

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
        </ConversationWrapper>
      ))}
    </ConvoHistoryContainer>
  );
};

export default MessageInboxConvoHistory;

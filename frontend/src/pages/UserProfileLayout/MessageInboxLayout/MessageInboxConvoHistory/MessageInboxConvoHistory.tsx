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
import { handleTokenExpiration } from "../../../../services/tokenService";
import { UserContext } from "../../../../context/UserContext";
import { getUserPublicProfile } from "../../../../services/userService";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";

interface MessageInboxConvoHistoryProps {
  onConversationSelect: (conversationId: number) => void;
}

const BASE_URL = "http://localhost:5000";

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

  const fetchUserNamesAndPictures = useCallback(
    async (conversations: Conversation[]) => {
      const fetchedUserNames: { [key: number]: string } = {};
      const fetchedUserPictures: { [key: number]: string } = {};

      for (const conversation of conversations) {
        const otherUserId =
          loggedInUserId === conversation.user1_id
            ? conversation.user2_id
            : conversation.user1_id;

        try {
          const profile = await getUserPublicProfile(otherUserId.toString());
          fetchedUserNames[conversation.id] = profile.user.name;
          fetchedUserPictures[conversation.id] =
            profile.user.profile_picture || "";
        } catch (error) {
          console.error("Failed to fetch user profile", error);
        }
      }
      setUserNames(fetchedUserNames);
      setUserPictures(fetchedUserPictures);
    },
    [loggedInUserId]
  );

  useEffect(() => {
    const fetchConversations = async () => {
      const token = await handleTokenExpiration();
      try {
        const response = await fetch(`${BASE_URL}/api/conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setConversations(data);
          fetchUserNamesAndPictures(data);
        } else {
          console.error("Unexpected response format:", data);
          setConversations([]);
        }
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
        setConversations([]);
      }
    };
    fetchConversations();
  }, [fetchUserNamesAndPictures]);

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

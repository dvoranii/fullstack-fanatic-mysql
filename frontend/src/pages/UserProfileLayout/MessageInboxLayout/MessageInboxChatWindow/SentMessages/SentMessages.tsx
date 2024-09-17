import React, { useState, useEffect, useContext } from "react";
import { Message } from "../../../../../types/Message";
import {
  SentMessageWrapper,
  MessageText,
  MessageTimestamp,
  SenderName,
  TextContainer,
} from "./SentMessages.styled";
import { getMessagesForConversation } from "../../../../../services/messageService";
import { getUserPublicProfile } from "../../../../../services/userService";
import { UserContext } from "../../../../../context/UserContext";
import ProfilePicture from "../../../../../components/ProfilePicture/ProfilePicture";

interface SentMessagesProps {
  conversationId: number;
}

const SentMessages: React.FC<SentMessagesProps> = ({ conversationId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userNames, setUserNames] = useState<{ [key: number]: string }>({});
  const [userPictures, setUserPictures] = useState<{ [key: number]: string }>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesForConversation(conversationId);
        setMessages(data);
        await fetchUserNamesAndPictures(data); // Fetch both names and pictures
      } catch (err) {
        setError("Failed to load messages");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserNamesAndPictures = async (messages: Message[]) => {
      const fetchedUserNames: { [key: number]: string } = {};
      const fetchedUserPictures: { [key: number]: string } = {};

      for (const message of messages) {
        const userId = message.sender_id;
        if (!fetchedUserNames[userId] || !fetchedUserPictures[userId]) {
          try {
            const profile = await getUserPublicProfile(userId.toString());
            fetchedUserNames[userId] = profile.user.name;
            fetchedUserPictures[userId] = profile.user.profile_picture || "";
          } catch (error) {
            console.error("Failed to fetch user profile", error);
          }
        }
      }

      setUserNames((prev) => ({ ...prev, ...fetchedUserNames }));
      setUserPictures((prev) => ({ ...prev, ...fetchedUserPictures }));
    };

    fetchMessages();
  }, [conversationId]);

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {messages.map((message) => (
        <SentMessageWrapper
          key={message.id}
          issender={message.sender_id === loggedInUserId}
        >
          <ProfilePicture
            src={userPictures[message.sender_id] || ""}
            alt="User Profile Picture"
            width="45px"
            border="2px solid #ccc"
            bg="#ffffff"
          />

          <TextContainer>
            <SenderName>
              {userNames[message.sender_id] || `User ${message.sender_id}`}
            </SenderName>
            <MessageText>{message.content}</MessageText>
            <MessageTimestamp issender={message.sender_id === loggedInUserId}>
              {message.sent_at}
            </MessageTimestamp>
          </TextContainer>
        </SentMessageWrapper>
      ))}
    </>
  );
};

export default SentMessages;

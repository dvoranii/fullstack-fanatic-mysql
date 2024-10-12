import React, { useState, useEffect, useContext } from "react";
import { Message } from "../../../../../types/Message";
import {
  SentMessageWrapper,
  MessageText,
  MessageTimestamp,
  SenderName,
  TextContainer,
} from "./SentMessages.styled";
import { getUserPublicProfile } from "../../../../../services/userService";
import { UserContext } from "../../../../../context/UserContext";
import ProfilePicture from "../../../../../components/ProfilePicture/ProfilePicture";

interface SentMessagesProps {
  messages: Message[];
}

const SentMessages: React.FC<SentMessagesProps> = ({ messages }) => {
  const [userNames, setUserNames] = useState<{ [key: number]: string }>({});
  const [userPictures, setUserPictures] = useState<{ [key: number]: string }>(
    {}
  );
  const [error, setError] = useState<string | null>(null);
  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;

  useEffect(() => {
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
            setError("Failed to fetch user profile");
            console.error("Failed to fetch user profile", error);
          }
        }
      }

      setUserNames((prev) => ({ ...prev, ...fetchedUserNames }));
      setUserPictures((prev) => ({ ...prev, ...fetchedUserPictures }));
    };

    if (messages.length > 0) {
      fetchUserNamesAndPictures(messages);
    }
  }, [messages]);

  if (error) return <p>{error}</p>;

  if (!Array.isArray(messages)) {
    return <p>No messages available</p>;
  }

  return (
    <>
      {messages.map((message) => (
        <SentMessageWrapper
          key={`${message.id}-${message.sender_id}`}
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
              {new Date(message.sent_at).toLocaleString()}
            </MessageTimestamp>
          </TextContainer>
        </SentMessageWrapper>
      ))}
    </>
  );
};

export default SentMessages;

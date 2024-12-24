import React, { useContext } from "react";
import {
  SentMessageWrapper,
  MessageText,
  MessageTimestamp,
  SenderName,
  TextContainer,
} from "./SentMessages.styled";
import { UserContext } from "../../../../../context/UserContext";
import ProfilePicture from "../../../../../components/ProfilePicture/ProfilePicture";
import { Message } from "../../../../../types/Message";

interface SentMessagesProps {
  messages: Message[];
}

const SentMessages: React.FC<SentMessagesProps> = ({ messages }) => {
  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;

  if (!Array.isArray(messages)) {
    return <p>No messages available</p>;
  }

  return (
    <>
      {messages.map((message) => {
        const isSender = message.sender_id === loggedInUserId;
        const profilePicture = isSender
          ? message.sender_picture
          : message.sender_picture || "/assets/images/profile-icon.png";

        return (
          <SentMessageWrapper
            key={`${message.id}-${message.sender_id}`}
            issender={isSender}
          >
            <ProfilePicture
              src={profilePicture}
              alt="User Profile Picture"
              width="45px"
              border="2px solid #ccc"
              bg="#ffffff"
            />
            <TextContainer>
              <SenderName>
                {message.sender_name || `User ${message.sender_id}`}
              </SenderName>
              <MessageText>{message.content}</MessageText>
              <MessageTimestamp issender={isSender}>
                {new Date(message.sent_at).toLocaleString()}
              </MessageTimestamp>
            </TextContainer>
          </SentMessageWrapper>
        );
      })}
    </>
  );
};

export default SentMessages;

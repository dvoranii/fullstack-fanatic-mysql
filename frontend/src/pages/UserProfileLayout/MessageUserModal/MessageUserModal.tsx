// MessageUserModal.tsx
import React, { useState, useEffect, useContext } from "react";
import {
  ModalOverlay,
  ModalContent,
  UserAvatar,
  InputField,
  TextArea,
  SendButton,
  MessageForm,
  AvatarContainer,
  CloseBtn,
} from "./MessageUserModal.styled";
import { getUserPublicProfile } from "../../../services/userService";
import {
  createOrGetConversation,
  sendMessage,
} from "../../../services/messageService";
import CloseIcon from "../../../assets/images/close-icon.png";
import { UserContext } from "../../../context/UserContext";
// import { colors } from "../../../GlobalStyles";

const BASE_URL = "http://localhost:5000";

interface MessageUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSendMessage: (subject: string, message: string) => void;
}

const MessageUserModal: React.FC<MessageUserModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchUserProfile = async () => {
        try {
          const profileData = await getUserPublicProfile(userId);
          setUserAvatarUrl(profileData.user.profile_picture || "");
        } catch (error) {
          setError("Failed to load user profile.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    }
  }, [isOpen, userId]);

  const handleSendMessage = async () => {
    if (!loggedInUserId) {
      console.error("Logged in user ID is missing");
      return;
    }

    try {
      const numericUserId = Number(userId);

      const conversation = await createOrGetConversation(
        loggedInUserId,
        numericUserId,
        subject
      );

      await sendMessage(
        conversation.id,
        loggedInUserId,
        numericUserId,
        subject,
        message
      );

      console.log("Message sent successfully");
      onClose();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!isOpen) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        <AvatarContainer>
          <UserAvatar
            src={`${BASE_URL}${userAvatarUrl}` || ""}
            alt="User Avatar"
          />
        </AvatarContainer>
        <CloseBtn src={CloseIcon} onClick={onClose} />
        <MessageForm>
          <InputField
            type="text"
            placeholder="SUBJECT"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextArea
            placeholder="MESSAGE"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendButton onClick={handleSendMessage}>SEND</SendButton>
        </MessageForm>
      </ModalContent>
    </>
  );
};

export default MessageUserModal;

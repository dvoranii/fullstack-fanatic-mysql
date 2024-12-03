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
  checkExistingConversation,
  createOrGetConversation,
} from "../../../services/conversationService";
import { sendMessage } from "../../../services/messageService";
import CloseIcon from "../../../assets/images/close-icon.png";
import { UserContext } from "../../../context/UserContext";
import { getAvatarUrl } from "../../../utils/imageUtils";
import { useCsrfToken } from "../../../hooks/useCsrfToken";
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
  const csrfToken = useCsrfToken();
  const { profile } = useContext(UserContext) || {};
  const loggedInUserId = profile?.id;

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [conversationExists, setConversationExists] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const fetchUserProfileAndConversation = async () => {
        try {
          const profileData = await getUserPublicProfile(userId);
          setUserAvatarUrl(profileData.user.profile_picture || "");

          const existingConversation = await checkExistingConversation(
            Number(loggedInUserId),
            Number(userId)
          );

          if (existingConversation.exists) {
            setConversationExists(true);
          } else {
            setConversationExists(false);
          }
        } catch (error) {
          setError("Failed to load user profile.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfileAndConversation();
    }
  }, [isOpen, userId, loggedInUserId]);

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
        conversationExists ? "" : subject,
        csrfToken
      );

      await sendMessage(
        conversation.id,
        loggedInUserId,
        numericUserId,
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
          <UserAvatar src={getAvatarUrl(userAvatarUrl)} alt="User Avatar" />
        </AvatarContainer>
        <CloseBtn src={CloseIcon} onClick={onClose} />
        <MessageForm>
          {!conversationExists && (
            <InputField
              type="text"
              placeholder="SUBJECT"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          )}
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

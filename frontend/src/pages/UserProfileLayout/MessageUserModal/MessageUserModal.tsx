import React, { useState, useEffect } from "react";
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
import CloseIcon from "../../../assets/images/close-icon.png";

interface MessageUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (subject: string, message: string) => void;
  userId: string;
}

const BASE_URL = "http://localhost:5000";

const MessageUserModal: React.FC<MessageUserModalProps> = ({
  isOpen,
  onClose,
  onSendMessage,
  userId,
}) => {
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
          const avatarUrl = profileData.user.profile_picture;

          if (avatarUrl && avatarUrl.startsWith("/")) {
            setUserAvatarUrl(`${BASE_URL}${avatarUrl}`);
          } else {
            setUserAvatarUrl(avatarUrl || "");
          }
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

  const handleSendMessage = () => {
    onSendMessage(subject, message);
    onClose();
  };

  if (!isOpen) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        <AvatarContainer>
          <UserAvatar src={userAvatarUrl || ""} alt="User Avatar" />
        </AvatarContainer>
        <CloseBtn src={CloseIcon} />
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

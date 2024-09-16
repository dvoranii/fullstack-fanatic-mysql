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
import CloseIcon from "../../../assets/images/close-icon.png";
import { Conversation } from "../../../types/Conversations";
import { Message } from "../../../types/Message";
import { UserContext } from "../../../context/UserContext";
import { handleTokenExpiration } from "../../../services/tokenService";

interface MessageUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSendMessage: (subject: string, message: string) => void;
}

const BASE_URL = "http://localhost:5000";

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

  const handleSendMessage = async () => {
    if (!loggedInUserId) {
      console.error("Logged in user ID is missing");
      return;
    }

    try {
      const token = await handleTokenExpiration();

      const conversationResponse = await fetch(
        `${BASE_URL}/api/conversations/conversations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({ user1_id: loggedInUserId, user2_id: userId }),
        }
      );

      const conversation: Conversation = await conversationResponse.json();
      console.log(conversation);

      // Send the message
      const messageResponse = await fetch(`${BASE_URL}/api/messages/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conversation_id: conversation.id,
          sender_id: loggedInUserId,
          receiver_id: userId,
          subject,
          content: message,
        }),
      });

      const sentMessage: Message = await messageResponse.json();
      console.log("Message sent:", sentMessage);

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
          <UserAvatar src={userAvatarUrl || ""} alt="User Avatar" />
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

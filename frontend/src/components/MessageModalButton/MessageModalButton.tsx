// MessageUserModalButton.tsx
import { useState } from "react";
import {
  SimpleButton,
  StyledButton,
  ButtonIcon,
  ButtonText,
  CustomIcon,
} from "./MessageModalButton.styled";
import MessageUserModal from "../../pages/UserProfileLayout/MessageUserModal/MessageUserModal";

interface MessageModalButtonProps {
  userId: string;
  variant?: "publicUser" | "simple";
  text?: string;
}

const MessageUserModalButton: React.FC<MessageModalButtonProps> = ({
  userId,
  variant = "simple",
  text = "Message",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenMessageModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseMessageModal = () => {
    setIsModalOpen(false);
  };

  const handleSendMessage = (subject: string, message: string) => {
    console.log(`Message sent to user ${userId}: ${subject}, ${message}`);
  };

  return (
    <>
      {variant === "publicUser" ? (
        <StyledButton onClick={handleOpenMessageModal}>
          <ButtonText>{text}</ButtonText>
          <ButtonIcon>
            <CustomIcon />
          </ButtonIcon>
        </StyledButton>
      ) : (
        <SimpleButton onClick={handleOpenMessageModal}>{text}</SimpleButton>
      )}

      {isModalOpen && (
        <MessageUserModal
          isOpen={isModalOpen}
          onClose={handleCloseMessageModal}
          userId={userId}
          onSendMessage={handleSendMessage}
        />
      )}
    </>
  );
};

export default MessageUserModalButton;

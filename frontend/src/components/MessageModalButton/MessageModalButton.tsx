import { useState } from "react";
import {
  SimpleButton,
  StyledButton,
  ButtonIcon,
  ButtonText,
  CustomIcon,
  BtnWrapper
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
    <BtnWrapper>
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
</BtnWrapper>
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

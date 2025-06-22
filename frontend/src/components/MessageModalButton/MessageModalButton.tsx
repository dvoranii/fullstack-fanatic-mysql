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
  isBlocked?: boolean;
}

const MessageUserModalButton: React.FC<MessageModalButtonProps> = ({
  userId,
  variant = "simple",
  text = "Message",
  isBlocked = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenMessageModal = () => {

    if (isBlocked) return;
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
        <StyledButton 
        onClick={handleOpenMessageModal}
        $isBlocked={isBlocked}
        >
        <ButtonText $isBlocked={isBlocked}>{text}</ButtonText>
        <ButtonIcon $isBlocked={isBlocked}>
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

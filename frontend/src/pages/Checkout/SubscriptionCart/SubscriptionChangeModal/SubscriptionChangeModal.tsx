import {
  ModalOverlay,
  ModalContent,
  CloseButton,
} from "./SubscriptionChangeModal.styled";
interface SubscriptionChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string | null;
}

const SubscriptionChangeModal: React.FC<SubscriptionChangeModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SubscriptionChangeModal;

import {
  ModalWrapper,
  ModalContent,
  ModalContentText,
  Button,
} from "./DeleteConfirmationModal.styled";

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onConfirm,
  onCancel,
  message,
}) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <ModalContentText>{message}</ModalContentText>
        <Button onClick={onConfirm}>Yes</Button>
        <Button onClick={onCancel}>No</Button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default DeleteConfirmationModal;

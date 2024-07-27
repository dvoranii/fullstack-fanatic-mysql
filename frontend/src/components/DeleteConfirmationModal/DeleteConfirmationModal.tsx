import {
  ModalWrapper,
  ModalContent,
  ModalContentText,
  Button,
} from "./DeleteConfirmationModal.styled";

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <ModalContentText>
          Are you sure you want to delete your comment?
        </ModalContentText>
        <Button onClick={onConfirm}>Yes</Button>
        <Button onClick={onCancel}>No</Button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default DeleteConfirmationModal;

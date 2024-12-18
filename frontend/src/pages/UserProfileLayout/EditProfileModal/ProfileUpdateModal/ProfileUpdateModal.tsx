import { useEffect } from "react";
import { ModalOverlay, ModalContent } from "./ProfileUpdateModal.styled";
import EditProfileCheckmark from "../../../../assets/images/edit-profile-checkmark.png";

interface ProfileUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string | null;
}

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {message && <p>{message}</p>}{" "}
        <img src={EditProfileCheckmark} alt="checkmark" loading="lazy" />
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileUpdateModal;

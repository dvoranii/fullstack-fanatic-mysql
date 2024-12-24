import { useEffect } from "react";
import { ModalOverlay, ModalContent } from "./ProfileUpdateModal.styled";

interface ProfileUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string | null;
  success: boolean;
}

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({
  isOpen,
  onClose,
  message,
  success,
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
        {message && <p>{message}</p>}
        {success ? (
          <img
            src="/assets/images/edit-profile-checkmark.png"
            alt="checkmark"
            loading="lazy"
            width="32px"
            height="32px"
          />
        ) : (
          <img
            src="/assets/images/edit-profile-failed.png"
            alt="failed"
            loading="lazy"
            width="32px"
            height="32px"
          />
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileUpdateModal;

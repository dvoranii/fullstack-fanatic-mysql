import { useEffect } from "react";
import { ModalOverlay, ModalContent } from "./ProfileUpdateModal.styled";

import EditProfileCheckmark from "/assets/images/edit-profile-checkmark.png";
import EditProfileFailed from "/assets/images/edit-profile-failed.png";

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
            src={EditProfileCheckmark}
            alt="checkmark"
            loading="lazy"
            width="32px"
            height="32px"
          />
        ) : (
          <img
            src={EditProfileFailed}
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

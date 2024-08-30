import { User } from "./User";

export interface EditProfileModalProps {
  profile: User;
  setProfile: (profile: User) => void;
  closeModal: () => void;
}

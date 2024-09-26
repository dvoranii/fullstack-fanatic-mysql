import { User } from "./User/User";

export interface EditProfileModalProps {
  profile: User;
  setProfile: (profile: User) => void;
  closeModal: () => void;
}

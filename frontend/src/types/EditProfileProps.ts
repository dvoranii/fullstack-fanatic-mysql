import { User } from "./User/User";

export interface EditProfileModalProps {
  profile: User;
  setProfile: (profile: User) => void;
  closeModal: () => void;
}

export interface ProfileUpdateData {
  profile: User;
  displayName: string;
  profession: string;
  bio: string;
  socialLinks: { [key: string]: string };
  profilePicture: File | null;
  isChanged: {
    displayName: boolean;
    profession: boolean;
    bio: boolean;
    socialLinks: boolean;
    profilePicture: boolean;
  };
  csrfToken: string;
}

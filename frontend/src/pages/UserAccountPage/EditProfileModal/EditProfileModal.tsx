import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalForm,
  FormGroup,
  Label,
  Input,
  TextArea,
  SaveButton,
} from "./EditProfileModal.styled";
import SocialLinksEditor from "./SocialLinksEditor/SocialLinksEditor";
import { useState } from "react";
import { User } from "../../../types/User";
import { handleTokenExpiration } from "../../../services/tokenService";

interface EditProfileModalProps {
  profile: User;
  setProfile: (profile: User) => void;
  closeModal: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  setProfile,
  closeModal,
}) => {
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [profession, setProfession] = useState(profile?.profession || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [socialLinks, setSocialLinks] = useState<{ [key: string]: string }>(
    profile.social_links || {}
  );

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = await handleTokenExpiration();

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch("/api/profile/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          displayName,
          profession,
          bio,
          socialLinks,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedProfile = await response.json();

      setProfile(updatedProfile);
      alert("Profile updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("There was an error updating your profile.");
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <ModalForm onSubmit={handleProfileUpdate}>
          <FormGroup>
            <Label>Display Name:</Label>
            <Input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Profession:</Label>
            <Input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Bio:</Label>
            <TextArea value={bio} onChange={(e) => setBio(e.target.value)} />
          </FormGroup>

          <SocialLinksEditor
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
          />
          <SaveButton type="submit">Save Changes</SaveButton>
        </ModalForm>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditProfileModal;

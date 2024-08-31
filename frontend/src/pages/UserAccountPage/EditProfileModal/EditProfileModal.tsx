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
  MaxCharCountText,
} from "./EditProfileModal.styled";
import { UpdatedProfileFields } from "../../../types/User";
import SocialLinksEditor from "./SocialLinksEditor/SocialLinksEditor";
import { useState, useEffect } from "react";
import { EditProfileModalProps } from "../../../types/EditProfileProps";
import { handleTokenExpiration } from "../../../services/tokenService";

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  setProfile,
  closeModal,
}) => {
  const [displayName, setDisplayName] = useState(
    profile.display_name || profile.name || ""
  );
  const [profession, setProfession] = useState(profile.profession || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [socialLinks, setSocialLinks] = useState<{ [key: string]: string }>(
    profile.social_links || {}
  );

  const maxDisplayNameCharCount = 30;
  const maxProfessionCharCount = 50;
  const maxBioCharCount = 250;

  const [isChanged, setIsChanged] = useState({
    displayName: false,
    profession: false,
    bio: false,
    socialLinks: false,
  });

  useEffect(() => {
    setDisplayName(profile.display_name || profile.name || "");
    setProfession(profile.profession || "");
    setBio(profile.bio || "");
    setSocialLinks(profile.social_links || {});
  }, [profile]);

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
    setIsChanged((prev) => ({ ...prev, displayName: true }));
  };

  const handleProfessionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfession(e.target.value);
    setIsChanged((prev) => ({ ...prev, profession: true }));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
    setIsChanged((prev) => ({ ...prev, bio: true }));
  };

  const handleSocialLinksChange = (updatedLinks: { [key: string]: string }) => {
    setSocialLinks(updatedLinks);
    setIsChanged((prev) => ({ ...prev, socialLinks: true }));
  };

  const markSocialLinksChanged = () => {
    setIsChanged((prev) => ({ ...prev, socialLinks: true }));
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = await handleTokenExpiration();

      if (!token) {
        throw new Error("User not authenticated");
      }

      const updatedFields: UpdatedProfileFields = {};

      if (isChanged.displayName) updatedFields.display_name = displayName;
      if (isChanged.profession) updatedFields.profession = profession;
      if (isChanged.bio) updatedFields.bio = bio;
      if (isChanged.socialLinks) updatedFields.social_links = socialLinks;

      console.log("Updated Fields: ", updatedFields);

      const response = await fetch("/api/profile/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
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
              onChange={handleDisplayNameChange}
              maxLength={maxDisplayNameCharCount}
            />
            <MaxCharCountText
              style={{
                color:
                  displayName.length >= maxDisplayNameCharCount
                    ? "red"
                    : "black",
              }}
            >
              {maxDisplayNameCharCount - displayName.length}
            </MaxCharCountText>
          </FormGroup>
          <FormGroup>
            <Label>Profession:</Label>
            <Input
              type="text"
              value={profession}
              onChange={handleProfessionChange}
              maxLength={maxProfessionCharCount}
            />
            <MaxCharCountText
              style={{
                color: profession.length >= maxBioCharCount ? "red" : "black",
              }}
            >
              {maxProfessionCharCount - profession.length}
            </MaxCharCountText>
          </FormGroup>
          <FormGroup>
            <Label>Bio:</Label>
            <TextArea
              value={bio}
              onChange={handleBioChange}
              maxLength={maxBioCharCount}
              placeholder="Enter your bio"
            />
            <MaxCharCountText
              style={{ color: bio.length >= maxBioCharCount ? "red" : "black" }}
            >
              {maxBioCharCount - bio.length}
            </MaxCharCountText>
          </FormGroup>

          <SocialLinksEditor
            socialLinks={socialLinks}
            setSocialLinks={handleSocialLinksChange}
            markSocialLinksChanged={markSocialLinksChanged}
          />
          <SaveButton type="submit">Save Changes</SaveButton>
        </ModalForm>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditProfileModal;

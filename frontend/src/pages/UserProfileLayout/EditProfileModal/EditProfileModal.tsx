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
  ProfileImage,
} from "./EditProfileModal.styled";
import SocialLinksEditor from "./SocialLinksEditor/SocialLinksEditor";
import { useState, useEffect } from "react";
import { EditProfileModalProps } from "../../../types/EditProfileProps";
import { handleTokenExpiration } from "../../../services/tokenService";
import { uploadImage } from "../../../services/imageUploadService";
import { getAvatarUrl } from "../../../utils/imageUtils";
import { useCsrfToken } from "../../../hooks/useCsrfToken";
import { updateUserProfile } from "../../../services/profileService";

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  setProfile,
  closeModal,
}) => {
  const csrfToken = useCsrfToken();
  const [displayName, setDisplayName] = useState(
    profile.display_name || profile.name || ""
  );
  const [profession, setProfession] = useState(profile.profession || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [socialLinks, setSocialLinks] = useState<{ [key: string]: string }>(
    profile.social_links || {}
  );
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);
  const [newProfilePicturePreview, setNewProfilePicturePreview] = useState<
    string | null
  >(null);

  const maxDisplayNameCharCount = 30;
  const maxProfessionCharCount = 50;
  const maxBioCharCount = 250;

  const [isChanged, setIsChanged] = useState({
    displayName: false,
    profession: false,
    bio: false,
    socialLinks: false,
    profilePicture: false,
  });

  useEffect(() => {
    setDisplayName(profile.display_name || profile.name || "");
    setProfession(profile.profession || "");
    setBio(profile.bio || "");
    setSocialLinks(profile.social_links || {});
    setProfilePicturePreview(profile.profile_picture || null);
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

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e?.target.files?.[0];
    if (!file) return;

    setProfilePicture(file);
    setIsChanged((prev) => ({ ...prev, profilePicture: true }));

    const reader = new FileReader();
    reader.onload = () => {
      setNewProfilePicturePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const markSocialLinksChanged = () => {
    setIsChanged((prev) => ({ ...prev, socialLinks: true }));
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = await handleTokenExpiration();
      if (!token) throw new Error("User not authenticated");

      let profilePicturePath = profile.profile_picture;

      if (isChanged.profilePicture && profilePicture) {
        const profilePictureData = new FormData();
        profilePictureData.append("profile_picture", profilePicture);

        const data = await uploadImage(
          "/api/profile/upload-profile-picture",
          profilePictureData,
          csrfToken
        );

        if (!data.imagePath)
          throw new Error("Failed to upload profile picture");

        profilePicturePath = data.imagePath;

        setProfilePicturePreview(profilePicturePath);
        setNewProfilePicturePreview(null);
      }

      const profileData = new FormData();

      if (isChanged.displayName)
        profileData.append("display_name", displayName);
      if (isChanged.profession) profileData.append("profession", profession);
      if (isChanged.bio) profileData.append("bio", bio);
      if (isChanged.socialLinks) {
        profileData.append("social_links", JSON.stringify(socialLinks));
      }
      if (profilePicturePath) {
        profileData.append("profile_picture", profilePicturePath);
      }

      const updatedProfile = await updateUserProfile(
        profileData,
        token,
        csrfToken
      );
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
            <Label>Profile Picture:</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
            {newProfilePicturePreview ? (
              <ProfileImage
                src={newProfilePicturePreview}
                alt="New Profile Preview"
              />
            ) : (
              profilePicturePreview && (
                <ProfileImage
                  src={getAvatarUrl(profilePicturePreview)}
                  alt="Profile Preview"
                />
              )
            )}
          </FormGroup>
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

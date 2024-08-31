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
// import { UpdatedProfileFields } from "../../../types/User";
import SocialLinksEditor from "./SocialLinksEditor/SocialLinksEditor";
import { useState, useEffect } from "react";
import { EditProfileModalProps } from "../../../types/EditProfileProps";
import { handleTokenExpiration } from "../../../services/tokenService";

const BASE_URL = "http://localhost:5000";

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
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<
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
    if (file) {
      setProfilePicture(file);
      setIsChanged((prev) => ({ ...prev, profilePicture: true }));

      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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

      let profilePicturePath = profile.profile_picture;

      if (isChanged.profilePicture && profilePicture) {
        const profilePictureFormData = new FormData();
        profilePictureFormData.append("profile_picture", profilePicture);

        const pictureResponse = await fetch(
          "/api/profile/upload-profile-picture",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: profilePictureFormData,
          }
        );

        if (!pictureResponse.ok) {
          throw new Error("Failed to upload profile picture");
        }

        const pictureData = await pictureResponse.json();
        profilePicturePath = pictureData.profilePicturePath;
      }

      const formData = new FormData();

      if (isChanged.displayName) formData.append("display_name", displayName);
      if (isChanged.profession) formData.append("profession", profession);
      if (isChanged.bio) formData.append("bio", bio);
      if (isChanged.socialLinks) {
        formData.append("social_links", JSON.stringify(socialLinks));
      }
      if (profilePicturePath) {
        formData.append("profile_picture", profilePicturePath); // Use the uploaded picture path
      }

      const response = await fetch("/api/profile/update-profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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
            <Label>Profile Picture:</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
            {profilePicturePreview && (
              <img
                src={
                  profilePicturePreview.startsWith("data:")
                    ? profilePicturePreview
                    : `${BASE_URL}${profilePicturePreview}`
                }
                alt="Profile Preview"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
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

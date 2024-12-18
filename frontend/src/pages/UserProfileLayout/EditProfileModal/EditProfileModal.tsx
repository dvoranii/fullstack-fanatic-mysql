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
import { getAvatarUrl } from "../../../utils/imageUtils";
import { useCsrfToken } from "../../../hooks/useCsrfToken";
import { handleProfileUpdate } from "../../../utils/profileUtils";
import ProfileUpdateModal from "./ProfileUpdateModal/ProfileUpdateModal";

const MAX_LENGTHS = {
  displayName: 30,
  profession: 50,
  bio: 250,
};

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

  const [isChanged, setIsChanged] = useState({
    displayName: false,
    profession: false,
    bio: false,
    socialLinks: false,
    profilePicture: false,
  });

  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setDisplayName(profile.display_name || profile.name || "");
    setProfession(profile.profession || "");
    setBio(profile.bio || "");
    setSocialLinks(profile.social_links || {});
    setProfilePicturePreview(profile.profile_picture || null);
  }, [profile]);

  const createChangeHandler =
    <T extends HTMLInputElement | HTMLTextAreaElement>(
      setter: React.Dispatch<React.SetStateAction<string>>,
      changedKey: keyof typeof isChanged
    ) =>
    (e: React.ChangeEvent<T>) => {
      setter(e.target.value);
      setIsChanged((prev) => ({ ...prev, [changedKey]: true }));
    };

  const readImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  const handleDisplayNameChange = createChangeHandler<HTMLInputElement>(
    setDisplayName,
    "displayName"
  );
  const handleProfessionChange = createChangeHandler<HTMLInputElement>(
    setProfession,
    "profession"
  );
  const handleBioChange = createChangeHandler<HTMLTextAreaElement>(
    setBio,
    "bio"
  );

  const handleSocialLinksChange = (updatedLinks: { [key: string]: string }) => {
    setSocialLinks(updatedLinks);
    setIsChanged((prev) => ({ ...prev, socialLinks: true }));
  };

  const markSocialLinksChanged = () => {
    setIsChanged((prev) => ({ ...prev, socialLinks: true }));
  };

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfilePicture(file);
    setIsChanged((prev) => ({ ...prev, profilePicture: true }));

    const preview = await readImageFile(file);
    setNewProfilePicturePreview(preview);
  };

  const onSubmitProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedProfile = await handleProfileUpdate({
        profile,
        displayName,
        profession,
        bio,
        socialLinks,
        profilePicture,
        isChanged,
        csrfToken,
      });

      if (isChanged.profilePicture && updatedProfile.profile_picture) {
        setProfilePicturePreview(updatedProfile.profile_picture);
        setNewProfilePicturePreview(null);
      }

      setProfile(updatedProfile);
      setUpdateMessage("Profile updated successfully!");
      setSuccess(true);
      setUpdateModalOpen(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateMessage("There was an error updating your profile.");
      setSuccess(false);
      setUpdateModalOpen(true);
    }
  };

  const {
    displayName: maxDisplayNameCharCount,
    profession: maxProfessionCharCount,
    bio: maxBioCharCount,
  } = MAX_LENGTHS;

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setUpdateMessage(null);
  };

  return (
    <>
      <ProfileUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        message={updateMessage}
        success={success}
      />

      <ModalOverlay>
        <ModalContent>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          <ModalForm onSubmit={onSubmitProfile}>
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
                style={{
                  color: bio.length >= maxBioCharCount ? "red" : "black",
                }}
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
    </>
  );
};

export default EditProfileModal;

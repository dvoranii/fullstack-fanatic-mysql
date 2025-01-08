import { handleTokenExpiration } from "../services/tokenService";
import { uploadProfilePicture } from "../services/imageUploadService";
import { updateUserProfile } from "../services/profileService";
import { User } from "../types/User/User";
import { ProfileUpdateData } from "../types/EditProfileProps";

export const handleProfileUpdate = async (
  data: ProfileUpdateData
): Promise<User> => {
  const {
    profile,
    displayName,
    profession,
    bio,
    socialLinks,
    profilePicture,
    isChanged,
    csrfToken,
  } = data;

  const token = await handleTokenExpiration();
  if (!token) throw new Error("User not authenticated");

  let profilePicturePath = profile.profile_picture;
  if (isChanged.profilePicture && profilePicture) {
    const profilePictureData = new FormData();
    profilePictureData.append("profile_picture", profilePicture);

    const uploadResult = await uploadProfilePicture(
      profilePictureData,
      csrfToken
    );

    if (!uploadResult.imageUrl)
      throw new Error("Failed to upload profile picture");
    profilePicturePath = uploadResult.imageUrl;
  }

  const profileData = new FormData();
  if (isChanged.displayName) profileData.append("display_name", displayName);
  if (isChanged.profession) profileData.append("profession", profession);
  if (isChanged.bio) profileData.append("bio", bio);
  if (isChanged.socialLinks) {
    profileData.append("social_links", JSON.stringify(socialLinks));
  }
  if (profilePicturePath) {
    profileData.append("profile_picture", profilePicturePath);
  }

  return updateUserProfile(profileData, token, csrfToken);
};

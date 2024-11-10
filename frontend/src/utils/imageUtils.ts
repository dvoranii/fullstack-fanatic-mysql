import ProfileIcon from "../assets/images/profile-icon.png";

const BASE_URL = "http://localhost:5000";

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = ProfileIcon;
};

export const getAvatarUrl = (profilePictureUrl: string | null) => {
  if (!profilePictureUrl) {
    return "";
  }
  return profilePictureUrl.includes("googleusercontent")
    ? profilePictureUrl
    : `${BASE_URL}${profilePictureUrl}`;
};

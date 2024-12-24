const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = "/assets/images/profile-icon.png";
};

export const getAvatarUrl = (profilePictureUrl: string | null) => {
  console.log(profilePictureUrl);
  if (!profilePictureUrl) {
    return "";
  }
  return profilePictureUrl.includes("googleusercontent")
    ? profilePictureUrl
    : `${BASE_URL}${profilePictureUrl}`;
};

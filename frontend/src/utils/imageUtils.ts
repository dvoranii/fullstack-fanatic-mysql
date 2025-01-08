export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src =
    "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/home/profile-icon.png";
};

export const getAvatarUrl = (profilePictureUrl: string | null) => {
  if (!profilePictureUrl) {
    return "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/home/profile-icon.png";
  }
  return profilePictureUrl;
};

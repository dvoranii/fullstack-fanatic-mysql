import ProfileIcon from "../assets/images/profile-icon.png";

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = ProfileIcon;
};

import ProfileIcon from "../assets/images/profile-icon.png"; // Adjust the path as needed

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = ProfileIcon;
};

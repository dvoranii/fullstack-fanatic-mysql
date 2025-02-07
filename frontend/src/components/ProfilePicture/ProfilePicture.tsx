import { handleImageError } from "../../utils/imageUtils";
import { StyledProfilePicture } from "./ProfilePicture.styled";

interface ProfilePictureProps {
  src: string | null;
  alt: string;
  width: string;
  border: string;
  bg?: string;
}

// const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const ProfilePicture = ({
  src,
  alt,
  width,
  border,
  bg,
}: ProfilePictureProps) => {
  const imageUrl = src || "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/home/profile-icon.png";

  return (
    <StyledProfilePicture
      src={imageUrl}
      alt={alt}
      width={width}
      border={border}
      bg={bg}
      onError={handleImageError}
    />
  );
};

export default ProfilePicture;

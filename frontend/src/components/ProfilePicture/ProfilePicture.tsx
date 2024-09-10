import { handleImageError } from "../../utils/imageUtils";
import { StyledProfilePicture } from "./ProfilePicture.styled";

interface ProfilePictureProps {
  src: string;
  alt: string;
  width: string;
}

const BASE_URL = "http://localhost:5000";

const ProfilePicture = ({ src, alt, width }: ProfilePictureProps) => {
  const imageUrl = src ? `${BASE_URL}${src}` : "";
  return (
    <StyledProfilePicture
      src={imageUrl}
      alt={alt}
      width={width}
      onError={handleImageError}
    />
  );
};

export default ProfilePicture;

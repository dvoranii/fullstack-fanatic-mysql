import { handleImageError } from "../../utils/imageUtils";
import { StyledProfilePicture } from "./ProfilePicture.styled";

interface ProfilePictureProps {
  src: string;
  alt: string;
  width: string;
  border: string;
  bg?: string;
}

const BASE_URL = "http://localhost:5000";

const ProfilePicture = ({
  src,
  alt,
  width,
  border,
  bg,
}: ProfilePictureProps) => {
  const imageUrl = src.includes("googleusercontent")
    ? src
    : `${BASE_URL}${src}`;

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

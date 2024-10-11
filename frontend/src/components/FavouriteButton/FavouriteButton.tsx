import FavouriteIconImg from "../../assets/images/bookmark.png";
import FavouriteIconImgFilled from "../../assets/images/bookmark(filled).png";
import { FavouriteButtonImg } from "./FavouriteButton.styled";
import { FavouriteButtonProps } from "../../types/FavouritesButtonProps";

const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  isFavourited,
  onClick,
  altText,
  isDisabled = false,
}) => {
  return (
    <FavouriteButtonImg
      src={isFavourited ? FavouriteIconImgFilled : FavouriteIconImg}
      alt={altText}
      onClick={isDisabled ? undefined : onClick}
      isDisabled={isDisabled}
    />
  );
};

export default FavouriteButton;

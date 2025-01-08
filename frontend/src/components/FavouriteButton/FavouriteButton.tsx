import { FavouriteButtonImg } from "./FavouriteButton.styled";
import { FavouriteButtonProps } from "../../types/FavouritesButtonProps";

const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  isFavourited,
  onClick,
  altText,
  isDisabled = false,
}) => {
  const titleText = isFavourited ? "Unfavorite" : "Favorite";

  return (
    <FavouriteButtonImg
      src={
        isFavourited
          ? "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/misc/bookmark(filled).png"
          : "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/misc/bookmark.png"
      }
      alt={altText}
      title={titleText}
      onClick={isDisabled ? undefined : onClick}
      isDisabled={isDisabled}
    />
  );
};

export default FavouriteButton;

import React from "react";
import { CartItem } from "../../types/CartItem";
import AddToCartIcon from "/assets/images/add-to-cart-icon.png";
import { AddToCartWrapper } from "./AddToCartButton.styled";

interface AddToCartButtonProps {
  item: CartItem;
  alreadyInCart: boolean;
  isAccessible: boolean;
  onAddToCart: (item: CartItem) => void;
  margin?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  item,
  alreadyInCart,
  isAccessible,
  onAddToCart,
  margin,
}) => {
  const isDisabled = alreadyInCart || isAccessible;

  const buttonTitle = alreadyInCart
    ? "This item is already in your cart"
    : isAccessible
    ? "You already have access to this intem through your subscription"
    : "Add to Cart";

  return (
    <AddToCartWrapper margin={margin}>
      <button
        onClick={() => onAddToCart(item)}
        disabled={isDisabled}
        style={{
          opacity: isDisabled ? 0.5 : 1,
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
      >
        <img src={AddToCartIcon} alt="Add to cart" title={buttonTitle} />
      </button>
    </AddToCartWrapper>
  );
};

export default AddToCartButton;

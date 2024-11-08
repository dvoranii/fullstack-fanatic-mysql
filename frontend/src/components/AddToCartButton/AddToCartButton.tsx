import React from "react";
import { CartItem } from "../../types/CartItem";
import AddToCartIcon from "../../assets/images/add-to-cart-icon.png";
import { AddToCartWrapper } from "./AddToCartButton.styled";

interface AddToCartButtonProps {
  item: CartItem;
  alreadyInCart: boolean;
  onAddToCart: (item: CartItem) => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  item,
  alreadyInCart,
  onAddToCart,
}) => {
  return (
    <AddToCartWrapper>
      <button
        onClick={() => onAddToCart(item)}
        disabled={alreadyInCart}
        style={{
          opacity: alreadyInCart ? 0.5 : 1,
          cursor: alreadyInCart ? "not-allowed" : "pointer",
        }}
      >
        <img
          src={AddToCartIcon}
          alt="Add to cart"
          title={alreadyInCart ? "Added to Cart" : "Add to Cart"}
        />
      </button>
    </AddToCartWrapper>
  );
};

export default AddToCartButton;

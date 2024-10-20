import React, { useState, useRef, useEffect, useContext } from "react";
import cartIcon from "../../../assets/images/shopping-cart-icon.png";
import { NavIconWrapper, NavIconImg } from "../../NavBar/NavBar.styled";
import {
  ShoppingCartItem,
  CartDetails,
  ClearCartBtnWrapper,
  ShoppingCartContentWrapper,
  CartItemTitleWrapper,
  CartBtnWrapper,
  ViewCartLink,
  CheckoutBtn,
} from "./ShoppingCart.styled";
import Dropdown from "../Dropdown/Dropdown";
import { UserContext } from "../../../context/UserContext";
import { handleCheckout } from "../../../utils/checkoutUtils";

const ShoppingCart: React.FC = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    cartItems = [],
    removeItemFromCart = () => {},
    clearCart = () => {},
  } = useContext(UserContext) || {};

  const toggleCartVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCartVisible(!isCartVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsCartVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <NavIconWrapper>
        <NavIconImg src={cartIcon} alt="Cart" onClick={toggleCartVisibility} />

        <Dropdown isVisible={isCartVisible} alignRight width="400px">
          <ShoppingCartContentWrapper>
            <h3>Shopping Cart</h3>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <ShoppingCartItem key={item.id}>
                  <CartItemTitleWrapper>
                    <p>{item.title}</p>
                  </CartItemTitleWrapper>
                  <span>Price: ${item.price.toFixed(2)}</span>
                  <button onClick={() => removeItemFromCart(item.id)}>
                    Remove
                  </button>
                </ShoppingCartItem>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
            <CartDetails>
              <p>
                Total: $
                {cartItems
                  .reduce((total, item) => total + item.price, 0)
                  .toFixed(2)}
              </p>
              {cartItems.length > 0 && (
                <CartBtnWrapper>
                  <ViewCartLink to="/my-cart">View Cart</ViewCartLink>
                  <CheckoutBtn onClick={() => handleCheckout(cartItems)}>
                    Proceed to Checkout
                  </CheckoutBtn>
                </CartBtnWrapper>
              )}
            </CartDetails>
            {cartItems.length !== 0 && (
              <ClearCartBtnWrapper>
                <button onClick={clearCart}>Clear Cart</button>
              </ClearCartBtnWrapper>
            )}
          </ShoppingCartContentWrapper>
        </Dropdown>
      </NavIconWrapper>
    </div>
  );
};

export default ShoppingCart;

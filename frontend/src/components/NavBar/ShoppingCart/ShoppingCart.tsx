import {
  useState,
  useRef,
  useContext,
  useCallback,
  useMemo,
  memo,
} from "react";
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
import Dropdown from "../../Dropdown/Dropdown";
import { UserContext } from "../../../context/UserContext";
import useHandleCheckout from "../../../hooks/useHandleCheckout";
import useClickOutside from "../../../hooks/useClickOutside";

const ShoppingCart: React.FC = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    cartItems = [],
    removeItemFromCart = () => {},
    clearCart = () => {},
  } = useContext(UserContext) || {};

  const { handleCheckout } = useHandleCheckout();

  const toggleCartVisibility = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCartVisible((prev) => !prev);
  }, []);

  useClickOutside(containerRef, () => setIsCartVisible(false));

  const totalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + item.price, 0).toFixed(2),
    [cartItems]
  );

  const handleRemoveItem = useCallback(
    (id: number) => removeItemFromCart(id),
    [removeItemFromCart]
  );

  const cartContent = useMemo(
    () =>
      cartItems.length > 0 ? (
        cartItems.map((item) => (
          <ShoppingCartItem key={item.id}>
            <CartItemTitleWrapper>
              <p>{item.title}</p>
            </CartItemTitleWrapper>
            <span>Price: ${item.price.toFixed(2)}</span>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </ShoppingCartItem>
        ))
      ) : (
        <p>Your cart is empty</p>
      ),
    [cartItems, handleRemoveItem]
  );

  const cartActions = useMemo(
    () =>
      cartItems.length > 0 && (
        <>
          <CartBtnWrapper>
            <ViewCartLink to="/my-cart">View Cart</ViewCartLink>
            <CheckoutBtn onClick={() => handleCheckout(cartItems)}>
              Proceed to Checkout
            </CheckoutBtn>
          </CartBtnWrapper>
          <ClearCartBtnWrapper>
            <button onClick={clearCart}>Clear Cart</button>
          </ClearCartBtnWrapper>
        </>
      ),
    [cartItems, handleCheckout, clearCart]
  );

  return (
    <div ref={containerRef}>
      <NavIconWrapper>
        <NavIconImg
          src={cartIcon}
          alt="Cart"
          title="Shopping Cart"
          onClick={toggleCartVisibility}
          height="50"
          width="50"
        />

        <Dropdown isVisible={isCartVisible} alignRight width="400px">
          <ShoppingCartContentWrapper>
            <h3>Shopping Cart</h3>
            {cartContent}
            <CartDetails>
              <p>Total: ${totalPrice}</p>
              {cartActions}
            </CartDetails>
          </ShoppingCartContentWrapper>
        </Dropdown>
      </NavIconWrapper>
    </div>
  );
};

export default memo(ShoppingCart);

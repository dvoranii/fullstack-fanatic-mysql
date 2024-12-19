import { Helmet } from "react-helmet-async";
import {
  CartItemsWrapper,
  CartItem,
  CartItemDetails,
  RemoveButton,
  OrderSummary,
  ProceedToCheckoutButton,
  CartPageWrapperInner,
} from "./ViewCart.styled";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
import useHandleCheckout from "../../../hooks/useHandleCheckout";
import TitleBanner from "../../../components/TitleBanner/TitleBanner";

const ViewCart: React.FC = () => {
  const { cartItems = [], removeItemFromCart = () => {} } =
    useContext(UserContext) || {};
  const { handleCheckout } = useHandleCheckout();

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const taxRate = 0.13;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  return (
    <>
      <Helmet>
        <title>Checkout - Full Stack Fanatic</title>
        <meta name="description" content="Shopping cart checkout page." />
      </Helmet>

      <TitleBanner textContent="My Cart - Tutorials & Blogs" />

      <CartPageWrapperInner>
        <CartItemsWrapper>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <img src={item.image} alt={item.title} />
              <CartItemDetails>
                <h3>{item.title}</h3>
                <p>{item.description || "Description of the product"}</p>
                <p>
                  <b>PRICE:</b> ${item.price.toFixed(2)}
                </p>
              </CartItemDetails>
              <RemoveButton onClick={() => removeItemFromCart(item.id)}>
                ✕
              </RemoveButton>
            </CartItem>
          ))}
        </CartItemsWrapper>
        <hr className="mobile-divider"></hr>
        <OrderSummary>
          <h4>ORDER SUMMARY</h4>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Taxes (HST): ${taxes.toFixed(2)}</p>
          <p>Total: ${total.toFixed(2)}</p>
          <ProceedToCheckoutButton onClick={() => handleCheckout(cartItems)}>
            PROCEED TO CHECKOUT
          </ProceedToCheckoutButton>
        </OrderSummary>
      </CartPageWrapperInner>
      <div style={{ height: "0" }}>&nbsp;</div>
    </>
  );
};

export default ViewCart;

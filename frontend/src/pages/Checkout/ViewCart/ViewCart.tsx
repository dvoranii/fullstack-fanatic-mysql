import { PageWrapper } from "../../../PageWrapper.styled";
import {
  ViewCartTitleBanner,
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
import { handleCheckout } from "../../../utils/checkoutUtils";

const ViewCart: React.FC = () => {
  const { cartItems = [], removeItemFromCart = () => {} } =
    useContext(UserContext) || {};

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const taxRate = 0.13;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  return (
    <>
      <ViewCartTitleBanner>
        <h1>My Cart</h1>
      </ViewCartTitleBanner>
      <PageWrapper>
        <CartPageWrapperInner>
          <CartItemsWrapper>
            {cartItems.map((item) => (
              <CartItem key={item.id}>
                <img src={item.image} alt={item.title} />
                <CartItemDetails>
                  <h3>{item.title}</h3>
                  <p>Product</p>
                  <p>{item.description || "Description of the product"}</p>
                  <p>PRICE: ${item.price.toFixed(2)}</p>
                </CartItemDetails>
                <RemoveButton onClick={() => removeItemFromCart(item.id)}>
                  ✕
                </RemoveButton>
              </CartItem>
            ))}
          </CartItemsWrapper>
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
      </PageWrapper>
    </>
  );
};

export default ViewCart;

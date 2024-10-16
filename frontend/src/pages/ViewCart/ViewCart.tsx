import { PageWrapper } from "../../PageWrapper.styled";
import { loadStripe } from "@stripe/stripe-js";
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
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { createCheckoutSession } from "../../services/checkoutService";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const ViewCart: React.FC = () => {
  const { cartItems = [], removeItemFromCart = () => {} } =
    useContext(UserContext) || {};

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const taxRate = 0.13;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  const handleCheckout = async () => {
    try {
      // Create the checkout session on the server
      const { data } = await createCheckoutSession(cartItems);

      // Get the Stripe instance
      const stripe = await stripePromise;

      if (!stripe || !data?.id) {
        throw new Error("Stripe or session ID not found");
      }

      // Use Stripe's redirectToCheckout method
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id, // Use the session ID returned from your backend
      });

      if (error) {
        console.error("Error redirecting to checkout", error);
        alert("There was an error redirecting to checkout. Please try again.");
      }
    } catch (error) {
      console.error("Failed to create checkout session", error);
      alert(
        "There was an error creating the checkout session. Please try again."
      );
    }
  };

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
            <ProceedToCheckoutButton onClick={handleCheckout}>
              PROCEED TO CHECKOUT
            </ProceedToCheckoutButton>
          </OrderSummary>
        </CartPageWrapperInner>
      </PageWrapper>
    </>
  );
};

export default ViewCart;

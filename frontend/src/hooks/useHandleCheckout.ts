import {
  createCheckoutPaymentSession,
  createCheckoutSubscriptionSession,
} from "../services/checkoutService";
import { CartItem } from "../types/CartItem";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useCsrfToken } from "./useCsrfToken";

const useHandleCheckout = () => {
  const csrfToken = useCsrfToken();
  const { clearCart, removeSubscriptionFromCart, profile } =
    useContext(UserContext) || {};

  const getStripeInstance = async () => {
    const { loadStripe } = await import("@stripe/stripe-js");
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    if (!stripe) {
      throw new Error("Failed to load Stripe instance.");
    }

    return stripe;
  };

  const handleCheckout = async (cartItems: CartItem[]) => {
    try {
      const { data } = await createCheckoutPaymentSession(cartItems, csrfToken);

      const stripe = await getStripeInstance();

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (error) {
        console.error("Error redirecting to checkout", error);
        alert("There was an error redirecting to checkout. Please try again.");
      } else if (clearCart) {
        clearCart();
      }
    } catch (error) {
      console.error("Failed to create checkout session", error);
      alert(
        "There was an error creating the checkout session. Please try again."
      );
    }
  };

  const handleSubscriptionCheckout = async (cartItems: CartItem[]) => {
    try {
      const { data } = await createCheckoutSubscriptionSession(
        cartItems,
        csrfToken,
        profile?.email,
        profile?.display_name
      );

      console.log(data);

      const stripe = await getStripeInstance();

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (error) {
        console.error("Error redirecting to subscription checkout", error);
        alert(
          "There was an error redirecting to subscription checkout. Please try again."
        );
      } else if (removeSubscriptionFromCart) {
        removeSubscriptionFromCart();
      }
    } catch (error) {
      console.error("Failed to create subscription checkout session", error);
      alert(
        "There was an error creating the subscription checkout session. Please try again."
      );
    }
  };

  return { handleCheckout, handleSubscriptionCheckout };
};

export default useHandleCheckout;

import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../services/checkoutService"; // Adjust path as necessary
import { CartItem } from "../types/CartItem";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const handleCheckout = async (cartItems: CartItem[]) => {
  try {
    const { data } = await createCheckoutSession(cartItems);

    const stripe = await stripePromise;

    if (!stripe || !data?.id) {
      throw new Error("Stripe or session ID not found");
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: data.id,
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

// import { loadStripe } from "@stripe/stripe-js";
// import { useContext } from "react";
// import {
//   createCheckoutPaymentSession,
//   createCheckoutSubscriptionSession,
// } from "../services/checkoutService";
// import { CartItem } from "../types/CartItem";
// import { UserContext } from "../context/UserContext";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// export const handleCheckout = async (cartItems: CartItem[]) => {
//   const { clearCart } = useContext(UserContext) || {};

//   try {
//     const { data } = await createCheckoutPaymentSession(cartItems);

//     const stripe = await stripePromise;

//     if (!stripe || !data?.id) {
//       throw new Error("Stripe or session ID not found");
//     }

//     const { error } = await stripe.redirectToCheckout({
//       sessionId: data.id,
//     });

//     if (error) {
//       console.error("Error redirecting to checkout", error);
//       alert("There was an error redirecting to checkout. Please try again.");
//     } else {
//       clearCart();
//     }
//   } catch (error) {
//     console.error("Failed to create checkout session", error);
//     alert(
//       "There was an error creating the checkout session. Please try again."
//     );
//   }
// };

// export const handleSubscriptionCheckout = async (cartItems: CartItem[]) => {
//   try {
//     const { data } = await createCheckoutSubscriptionSession(cartItems);

//     const stripe = await stripePromise;

//     if (!stripe || !data?.id) {
//       throw new Error("Stripe or session ID not found");
//     }

//     const { error } = await stripe.redirectToCheckout({
//       sessionId: data.id,
//     });

//     if (error) {
//       console.error("Error redirecting to subscription checkout", error);
//       alert(
//         "There was an error redirecting to subscription checkout. Please try again."
//       );
//     }
//   } catch (error) {
//     console.error("Failed to create subscription checkout session", error);
//     alert(
//       "There was an error creating the subscription checkout session. Please try again."
//     );
//   }
// };

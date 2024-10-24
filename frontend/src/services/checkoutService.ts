import { apiCall } from "../utils/apiUtils";
import { CartItem } from "../types/CartItem";

export async function createCheckoutPaymentSession(cartItems: CartItem[]) {
  return apiCall<{ id: string }>(
    "/api/stripe/create-checkout-session-payment",
    {
      method: "POST",
      body: JSON.stringify({ cartItems }),
    }
  );
}

export async function createCheckoutSubscriptionSession(cartItems: CartItem[]) {
  return apiCall<{ id: string }>(
    "/api/stripe/create-checkout-session-subscription",
    {
      method: "POST",
      body: JSON.stringify({ cartItems }),
    }
  );
}

import { apiCall } from "../utils/apiUtils";
import { CartItem } from "../types/CartItem";

export async function createCheckoutPaymentSession(
  cartItems: CartItem[],
  csrfToken: string
) {
  return apiCall<{ id: string }>(
    "/api/stripe/create-checkout-session-payment",
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ cartItems }),
      headers: {
        "x-csrf-token": csrfToken,
      },
    }
  );
}

export async function createCheckoutSubscriptionSession(
  cartItems: CartItem[],
  csrfToken: string
) {
  return apiCall<{ id: string }>(
    "/api/stripe/create-checkout-session-subscription",
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ cartItems }),
      headers: {
        "x-csrf-token": csrfToken,
      },
    }
  );
}

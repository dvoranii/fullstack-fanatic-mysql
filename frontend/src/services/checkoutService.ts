import { apiCall } from "../utils/apiUtils";
import { CartItem } from "../types/CartItem";

export async function createCheckoutPaymentSession(
  cartItems: CartItem[],
  csrfToken: string
) {
  return apiCall<{ id: string }>("/stripe/create-checkout-session-payment", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ cartItems }),
    headers: {
      "x-csrf-token": csrfToken,
    },
  });
}

export async function createCheckoutSubscriptionSession(
  cartItems: CartItem[],
  csrfToken: string,
  display_name?: string
) {
  return apiCall<{ id: string }>(
    "/stripe/create-checkout-session-subscription",
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ cartItems, display_name }),
      headers: {
        "x-csrf-token": csrfToken,
      },
    }
  );
}

export async function switchSubscriptionPlan(
  newPlanPriceId: string,
  csrfToken: string
) {
  return apiCall<{ message: string }>("/stripe/switch-subscription", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ newPlanPriceId }),
    headers: {
      "x-csrf-token": csrfToken,
      "Content-Type": "application/json",
    },
  });
}

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
  email?: string,
  display_name?: string
) {
  return apiCall<{ id: string }>(
    "/stripe/create-checkout-session-subscription",
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ cartItems, email, display_name }),
      headers: {
        "x-csrf-token": csrfToken,
      },
    }
  );
}

export async function switchSubscriptionPlan(
  newPlanPriceId: string,
  csrfToken: string,
  userName: string,
  email: string
) {
  return apiCall<{ message: string }>("/stripe/switch-subscription", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ newPlanPriceId, userName, email }),
    headers: {
      "x-csrf-token": csrfToken,
      "Content-Type": "application/json",
    },
  });
}

export async function cancelSubscription(csrfToken: string) {
  return apiCall<{ message: string }>("/stripe/cancel-subscription", {
    method: "POST",
    credentials: "include",
    headers: {
      "x-csrf-token": csrfToken,
    },
  });
}

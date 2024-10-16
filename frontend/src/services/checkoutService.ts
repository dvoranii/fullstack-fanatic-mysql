import { apiCall } from "../utils/apiUtils";
import { CartItem } from "../types/CartItem";

export async function createCheckoutSession(cartItems: CartItem[]) {
  return apiCall<{ id: string }>("/api/stripe/create-checkout-session", {
    method: "POST",
    body: JSON.stringify({ cartItems }),
  });
}

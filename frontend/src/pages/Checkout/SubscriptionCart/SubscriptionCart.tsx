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
  CartItemImgWrapper,
} from "./SubscriptionCart.styled";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
import useHandleCheckout from "../../../hooks/useHandleCheckout";
import { useCsrfToken } from "../../../hooks/useCsrfToken";
import { switchSubscriptionPlan } from "../../../services/checkoutService";

const SubscriptionCart: React.FC = () => {
  const csrfToken = useCsrfToken();
  const {
    subscriptionItem,
    removeSubscriptionFromCart = () => {},
    profile,
  } = useContext(UserContext) || {};
  const { handleSubscriptionCheckout } = useHandleCheckout();

  const handleSwitchSubscription = async () => {
    if (!subscriptionItem || !profile) return;

    const newPlanPriceId = subscriptionItem.priceId || "";

    try {
      const response = await switchSubscriptionPlan(newPlanPriceId, csrfToken);
      alert(response.data.message || "Subscription switched successfully!");
      removeSubscriptionFromCart();
    } catch (error) {
      console.error("Error switching subscription:", error);
      alert("Failed to switch subscription. Please try again.");
    }
  };

  const handleProceedToCheckout = () => {
    if (!subscriptionItem) return;

    if (profile?.premiumLevel) {
      handleSwitchSubscription();
    } else {
      handleSubscriptionCheckout([subscriptionItem]);
    }
  };

  return (
    <>
      <ViewCartTitleBanner>
        <h1>Subscription Checkout</h1>
      </ViewCartTitleBanner>
      <PageWrapper>
        <CartPageWrapperInner>
          <CartItemsWrapper>
            {subscriptionItem ? (
              <CartItem>
                <CartItemImgWrapper>
                  <img
                    src={subscriptionItem.image}
                    alt={subscriptionItem.title}
                  />
                </CartItemImgWrapper>

                <CartItemDetails>
                  <h3>{subscriptionItem.title}</h3>
                  <p>
                    {subscriptionItem.description ||
                      "Subscription plan details"}
                  </p>
                  <p>PRICE: ${subscriptionItem.price.toFixed(2)}</p>
                </CartItemDetails>
                <RemoveButton onClick={() => removeSubscriptionFromCart()}>
                  ✕
                </RemoveButton>
              </CartItem>
            ) : (
              <p>Your subscription cart is empty</p>
            )}
          </CartItemsWrapper>
          {subscriptionItem && (
            <OrderSummary>
              <h4>ORDER SUMMARY</h4>
              <p>Subtotal: ${subscriptionItem.price.toFixed(2)}</p>
              <ProceedToCheckoutButton onClick={handleProceedToCheckout}>
                PROCEED TO CHECKOUT
              </ProceedToCheckoutButton>
            </OrderSummary>
          )}
        </CartPageWrapperInner>
      </PageWrapper>
    </>
  );
};

export default SubscriptionCart;

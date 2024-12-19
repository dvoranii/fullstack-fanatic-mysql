import {
  SubscriptionCartWrapper,
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
import { useContext, useState } from "react";
import useHandleCheckout from "../../../hooks/useHandleCheckout";
import { useCsrfToken } from "../../../hooks/useCsrfToken";
import { switchSubscriptionPlan } from "../../../services/checkoutService";
import SubscriptionChangeModal from "./SubscriptionChangeModal/SubscriptionChangeModal";

const SubscriptionCart: React.FC = () => {
  const csrfToken = useCsrfToken();
  const {
    subscriptionItem,
    removeSubscriptionFromCart = () => {},
    profile,
    fetchProfile,
  } = useContext(UserContext) || {};
  const { handleSubscriptionCheckout } = useHandleCheckout();

  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSwitchSubscription = async () => {
    if (!subscriptionItem || !profile) return;

    const newPlanPriceId = subscriptionItem.priceId || "";

    try {
      const response = await switchSubscriptionPlan(newPlanPriceId, csrfToken);
      setModalMessage(response.data.message);
      setIsModalOpen(true);
      await fetchProfile?.();
      removeSubscriptionFromCart();
    } catch (error: unknown) {
      let errorMessage =
        "An unexpected error occurred while switching subscriptions.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setModalMessage(errorMessage);
      setIsModalOpen(true);
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
      {isModalOpen && modalMessage && (
        <SubscriptionChangeModal
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
        />
      )}
      <ViewCartTitleBanner>
        <h1>Subscription Checkout</h1>
      </ViewCartTitleBanner>
      <SubscriptionCartWrapper>
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
          <hr className="mobile-divider"></hr>
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
      </SubscriptionCartWrapper>
      <div style={{ height: "0" }}>&nbsp;</div>
    </>
  );
};

export default SubscriptionCart;

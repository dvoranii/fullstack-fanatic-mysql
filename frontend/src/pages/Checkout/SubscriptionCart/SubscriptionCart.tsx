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

const SubscriptionCart: React.FC = () => {
  const { subscriptionItem, removeSubscriptionFromCart = () => {} } =
    useContext(UserContext) || {};
  const { handleSubscriptionCheckout } = useHandleCheckout();

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
              <ProceedToCheckoutButton
                onClick={() => handleSubscriptionCheckout([subscriptionItem])}
              >
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

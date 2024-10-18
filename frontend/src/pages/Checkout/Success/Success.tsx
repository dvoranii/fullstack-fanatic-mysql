import { CheckoutResultPageWrapper } from "../Checkout.styles";
import { PageWrapper } from "../../../PageWrapper.styled";

const CheckoutSuccess: React.FC = () => {
  return (
    <PageWrapper>
      <CheckoutResultPageWrapper>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your transaction has been completed.</p>
      </CheckoutResultPageWrapper>
    </PageWrapper>
  );
};

export default CheckoutSuccess;

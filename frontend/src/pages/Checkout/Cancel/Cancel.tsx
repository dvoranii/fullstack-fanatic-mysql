import { Helmet } from "react-helmet-async";
import { CheckoutResultPageWrapper } from "../Checkout.styles";
import { PageWrapper } from "../../../PageWrapper.styled";

const CheckoutCancel: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Cancel - Full Stack Fanatic</title>
        <meta name="description" content="Payment cancelled." />
      </Helmet>
      <PageWrapper>
        <CheckoutResultPageWrapper>
          <h1>Payment Canceled</h1>
          <p>Your transaction was not completed. Please try again later.</p>
        </CheckoutResultPageWrapper>
      </PageWrapper>
      <div style={{ height: "0" }}>&nbsp;</div>
    </>
  );
};

export default CheckoutCancel;

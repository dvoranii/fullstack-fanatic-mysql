import { Helmet } from "react-helmet";
import { SuccessWrapper } from "./Sucess.styled";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";

const CheckoutSuccess = () => {
  const { clearCart } = useContext(UserContext) || {};

  useEffect(() => {
    if (clearCart) {
      clearCart();
    }
  }, [clearCart]);

  return (
    <>
      <Helmet>
        <title>Success - Full Stack Fanatic</title>
        <meta name="description" content="Payment success!" />
      </Helmet>
      <SuccessWrapper>
        <h1>Thank you for your purchase!</h1>
        <p>Your order has been successfully completed.</p>
      </SuccessWrapper>
    </>
  );
};

export default CheckoutSuccess;

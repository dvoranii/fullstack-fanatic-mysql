import { SuccessWrapper } from "./Sucess.styled";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";

const CheckoutSuccess = () => {
  const { clearCart } = useContext(UserContext) || {};

  useEffect(() => {
    if (clearCart) {
      clearCart(); // Clear cart on successful checkout
    }
  }, [clearCart]);

  return (
    <SuccessWrapper>
      <h1>Thank you for your purchase!</h1>
      <p>Your order has been successfully completed.</p>
    </SuccessWrapper>
  );
};

export default CheckoutSuccess;

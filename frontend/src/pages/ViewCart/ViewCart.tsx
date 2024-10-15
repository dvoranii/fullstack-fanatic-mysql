import { PageWrapper } from "../../PageWrapper.styled";
import { ViewCartTitleBanner } from "./ViewCart.styled";

const ViewCart: React.FC = () => {
  return (
    <>
      <ViewCartTitleBanner>Your Cart</ViewCartTitleBanner>
      <PageWrapper></PageWrapper>
    </>
  );
};

export default ViewCart;

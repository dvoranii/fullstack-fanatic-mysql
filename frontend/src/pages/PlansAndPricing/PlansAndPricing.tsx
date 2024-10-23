import { PageBGWrapper } from "./PlansAndPricing.styled";
import { PageWrapper } from "../../PageWrapper.styled";
import Title from "../../components/Title/Title";
import BGSwoosh from "../../assets/images/plansAndPricing/Ellipse7.svg";
import SquaresAndTriangles from "../../assets/images/plansAndPricing/SquaresAndTriangles.svg";

const PlansAndPricing: React.FC = () => {
  return (
    <PageBGWrapper>
      <img src={BGSwoosh} alt="" />
      <img src={SquaresAndTriangles} alt="" />
      <PageWrapper>
        <Title textContent={"Plans And Pricing"} />
      </PageWrapper>
    </PageBGWrapper>
  );
};

export default PlansAndPricing;

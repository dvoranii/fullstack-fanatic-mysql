import {
  CTAWrapperOuter,
  CTAWrapperInner,
  ImgWrapper,
  BrainImg,
  ContentWrapper,
} from "./CTASection.styled";
import BrainGraphic from "../../../assets/images/brain sides-cuate.svg";

const CTASection: React.FC = () => {
  return (
    <CTAWrapperOuter>
      <CTAWrapperInner>
        <ImgWrapper>
          <BrainImg src={BrainGraphic}></BrainImg>
        </ImgWrapper>
        <ContentWrapper></ContentWrapper>
      </CTAWrapperInner>
    </CTAWrapperOuter>
  );
};

export default CTASection;

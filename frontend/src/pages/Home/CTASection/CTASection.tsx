import {
  CTAWrapperOuter,
  CTAWrapperInner,
  ImgWrapper,
  BrainImg,
  ContentWrapper,
  TextWrapper,
  LinksWrapper,
  CTALink,
  SubtextWrapper,
} from "./CTASection.styled";
import BrainGraphic from "../../../assets/images/brain sides-cuate.svg";

const CTASection: React.FC = () => {
  return (
    <CTAWrapperOuter>
      <CTAWrapperInner>
        <ImgWrapper>
          <BrainImg src={BrainGraphic}></BrainImg>
        </ImgWrapper>
        <ContentWrapper>
          <TextWrapper>
            <h2>Think Smarter. Build Better.</h2>
            <SubtextWrapper>
              <h3>
                Get the full stack experience by signing up or reaching out.
              </h3>
            </SubtextWrapper>
          </TextWrapper>
          <LinksWrapper>
            <CTALink to="/contact">
              <span>Contact</span>
            </CTALink>

            <CTALink to="/register">
              <span>Sign Up!</span>
            </CTALink>
          </LinksWrapper>
        </ContentWrapper>
      </CTAWrapperInner>
    </CTAWrapperOuter>
  );
};

export default CTASection;

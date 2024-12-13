import {
  CTAWrapperOuter,
  CTAWrapperInner,
  ImgWrapper,
  BrainImg,
  ContentWrapper,
  TextWrapper,
  ButtonsWrapper,
  CTAButton,
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
          <ButtonsWrapper>
            <CTAButton>
              <span>Contact</span>
            </CTAButton>
            <CTAButton>
              <span>Sign Up!</span>
            </CTAButton>
          </ButtonsWrapper>
        </ContentWrapper>
      </CTAWrapperInner>
    </CTAWrapperOuter>
  );
};

export default CTASection;

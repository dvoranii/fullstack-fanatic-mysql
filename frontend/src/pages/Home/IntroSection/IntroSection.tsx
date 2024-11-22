import {
  IntroSectionWrapper,
  ContentWrapper,
  Title,
  IntroText,
  GetStartedButton,
  LeftGraphic,
  CornerEllipse,
  SwirlyArrow,
  ButtonWrapper,
} from "./IntroSection.styled";
import PersonGraphic from "../../../assets/images/Amico-images/Coding-workshop-amico.svg";
import CornerEllipseImg from "../../../assets/images/Ellipse-bg-solid.svg";
import SwirlyArrowImg from "../../../assets/images/swirly-arrow-3.svg";

const IntroSection: React.FC = () => {
  return (
    <IntroSectionWrapper>
      <LeftGraphic src={PersonGraphic} alt="Person Graphic" />
      <ContentWrapper>
        <Title>
          The <span>#1</span> Platform for Current <span>AND</span> Aspiring Web
          Developers, Designers & Cybersecurity Professionals
        </Title>
        <hr></hr>
        <IntroText>
          Stay ahead in today's competitive job market with Fullstack Fanatic.
          Our platform offers real-world tutorials, hands-on projects, and a
          personalized learning journey to help you master the skills employers
          demand. Dive into both web development and cybersecurity to become a
          versatile and in-demand professional.
        </IntroText>
        <ButtonWrapper>
          <GetStartedButton>Get Started</GetStartedButton>
          <SwirlyArrow src={SwirlyArrowImg} alt="Swirly Arrow" />
        </ButtonWrapper>
      </ContentWrapper>
      <CornerEllipse src={CornerEllipseImg} alt="Corner Ellipse" />
    </IntroSectionWrapper>
  );
};

export default IntroSection;

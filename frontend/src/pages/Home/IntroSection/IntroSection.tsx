import {
  IntroSectionWrapper,
  ContentWrapper,
  Title,
  IntroText,
  GetStartedLink,
  LeftGraphic,
  CornerEllipse,
  SwirlyArrow,
  LinkWrapper,
  BgSquaresAndTriangleImg,
  ImageWrapper,
} from "./IntroSection.styled";
import PersonGraphic from "/assets/images/Amico-images/Coding-workshop-amico.svg";
import CornerEllipseImg from "/assets/images/bg-images/Ellipse-bg-solid.svg";
import SwirlyArrowImg from "/assets/images/bg-images/swirly-arrow-3.svg";
import BgSquaresAndTriangle from "/assets/images/bg-images/SquaresAndTriangles.svg";

const IntroSection: React.FC = () => {
  return (
    <IntroSectionWrapper>
      <BgSquaresAndTriangleImg
        src={BgSquaresAndTriangle}
        alt=""
        width="260"
        height="153"
      />
      <LeftGraphic
        src={PersonGraphic}
        alt="Person Graphic"
        loading="lazy"
        width="314"
        height="314"
      />
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
        <LinkWrapper>
          <GetStartedLink to="/plans-and-pricing">Get Started</GetStartedLink>
          <SwirlyArrow
            src={SwirlyArrowImg}
            alt="Swirly Arrow"
            loading="lazy"
            width="120"
            height="95"
          />
        </LinkWrapper>
      </ContentWrapper>
      <ImageWrapper>
        <CornerEllipse
          src={CornerEllipseImg}
          alt="Corner Ellipse"
          loading="lazy"
          width="235"
          height="200"
        />
      </ImageWrapper>
    </IntroSectionWrapper>
  );
};

export default IntroSection;

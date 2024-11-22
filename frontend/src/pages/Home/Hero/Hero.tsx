import {
  LeftSideWrapper,
  RightSideWrapper,
  LogoWrapper,
  ElipseWrapper,
  HeroTextWrapper,
  HeroButtonWrapper,
  RightSideWrapperInner,
  TriangleArrowWrapper,
  TriangleArrow,
  TriangleArrowSecond,
  TriangleArrowThird,
} from "./Hero.styled";
import FSFLogo from "../../../assets/images/fsf-logo-notext.png";
import FSFLogoWhite from "../../../assets/images/fsf-logo-white-hires.png";
import ElipseBG from "../../../assets/images/Ellipse-bg.svg";

const Hero: React.FC = () => {
  return (
    <>
      <LeftSideWrapper>
        <LogoWrapper>
          <img src={FSFLogo} alt="" className="orange-logo" />
        </LogoWrapper>

        <ElipseWrapper>
          <img src={ElipseBG} alt="" />
        </ElipseWrapper>
      </LeftSideWrapper>
      <RightSideWrapper>
        <RightSideWrapperInner>
          <LogoWrapper>
            <img src={FSFLogoWhite} alt="" className="white-logo" />
          </LogoWrapper>

          <HeroTextWrapper>
            <h1>Full&nbsp;Stack&nbsp;Fanatic</h1>
            <h2>Full&nbsp;Stack.&nbsp;Full&nbsp;Potential.</h2>
          </HeroTextWrapper>

          <HeroButtonWrapper>
            <button>Learn more</button>
          </HeroButtonWrapper>
        </RightSideWrapperInner>
      </RightSideWrapper>
      <TriangleArrowWrapper>
        <TriangleArrow />
        <TriangleArrowSecond />
        <TriangleArrowThird />
      </TriangleArrowWrapper>
    </>
  );
};

export default Hero;

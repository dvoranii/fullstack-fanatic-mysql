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
  HeroWrapper,
  SocialButtonsWrapper,
  SocialIconWrapper,
} from "./Hero.styled";
import FSFLogo from "../../../assets/images/fsf-logo-notext.png";
import FSFLogoWhite from "../../../assets/images/fsf-logo-white-hires.png";
import ElipseBG from "../../../assets/images/Ellipse-bg.svg";
import GithubLogo from "../../../assets/images/socials/github-icon.png";
import CodepenLogo from "../../../assets/images/socials/codepen.png";
import LinkedinLogo from "../../../assets/images/socials/linkedin-icon-black.png";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <>
      <HeroWrapper>
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

            <SocialButtonsWrapper>
              <SocialIconWrapper>
                <Link to="#">
                  <img src={GithubLogo} alt="" />
                </Link>
              </SocialIconWrapper>
              <SocialIconWrapper>
                <Link to="#">
                  <img src={CodepenLogo} alt="" />
                </Link>
              </SocialIconWrapper>
              <SocialIconWrapper>
                <Link to="#">
                  <img src={LinkedinLogo} alt="" />
                </Link>
              </SocialIconWrapper>
            </SocialButtonsWrapper>
          </RightSideWrapperInner>
        </RightSideWrapper>
        <TriangleArrowWrapper>
          <TriangleArrow />
          <TriangleArrowSecond />
          <TriangleArrowThird />
        </TriangleArrowWrapper>
      </HeroWrapper>
    </>
  );
};

export default Hero;

import { Link } from "react-router-dom";
import {
  LeftSideWrapper,
  RightSideWrapper,
  LogoWrapper,
  ElipseWrapper,
  HeroTextWrapper,
  HeroLinkWrapper,
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
import FsfLogoDarkblue from "../../../assets/images/fsf-logo-darkblue.png";

const Hero: React.FC = () => {
  return (
    <>
      <HeroWrapper>
        <LeftSideWrapper>
          <img
            src={FsfLogoDarkblue}
            className="fsf-darkblue"
            alt="logo"
            loading="lazy"
            height="40"
            width="40"
          />
          <LogoWrapper>
            <img
              src={FSFLogo}
              alt="logo"
              className="orange-logo"
              width="400"
              height="400"
              loading="lazy"
            />
          </LogoWrapper>

          <HeroTextWrapper className="mobile-title">
            <h1>Full&nbsp;Stack&nbsp;Fanatic</h1>
            <h2>Full&nbsp;Stack.&nbsp;Full&nbsp;Potential.</h2>
          </HeroTextWrapper>

          <ElipseWrapper>
            <img
              src={ElipseBG}
              alt="elipse bg image"
              width="250"
              height="193"
            />
          </ElipseWrapper>
        </LeftSideWrapper>
        <RightSideWrapper>
          <RightSideWrapperInner>
            <img
              src={FSFLogoWhite}
              alt="logo"
              className="white-logo"
              loading="lazy"
              height="60"
              width="60"
            />

            <HeroTextWrapper className="desktop-title">
              <h1>Full&nbsp;Stack&nbsp;Fanatic</h1>
              <h2>Full&nbsp;Stack.&nbsp;Full&nbsp;Potential.</h2>
            </HeroTextWrapper>

            <HeroLinkWrapper>
              <Link to="/plans-and-pricing">Learn more</Link>
            </HeroLinkWrapper>

            <SocialButtonsWrapper>
              <SocialIconWrapper>
                <Link to="#">
                  <img
                    src={GithubLogo}
                    alt="github logo"
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                </Link>
              </SocialIconWrapper>
              <SocialIconWrapper>
                <Link to="#">
                  <img
                    src={CodepenLogo}
                    alt="codepen logo"
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                </Link>
              </SocialIconWrapper>
              <SocialIconWrapper>
                <Link to="#">
                  <img
                    src={LinkedinLogo}
                    alt="linkedin logo"
                    loading="lazy"
                    width="40"
                    height="40"
                  />
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

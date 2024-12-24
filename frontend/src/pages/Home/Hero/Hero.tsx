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

const Hero: React.FC = () => {
  return (
    <>
      <HeroWrapper>
        <LeftSideWrapper>
          <img
            src="/assets/images/fsf-logo-darkblue.png"
            className="fsf-darkblue"
            alt="logo"
            loading="lazy"
            height="40"
            width="40"
          />
          <LogoWrapper>
            <img
              src="/assets/images/fsf-logo-notext-large.webp"
              alt="logo"
              className="orange-logo"
              width="500"
              height="500"
            />
          </LogoWrapper>

          <HeroTextWrapper className="mobile-title">
            <h1>Full&nbsp;Stack&nbsp;Fanatic</h1>
            <h2>Full&nbsp;Stack.&nbsp;Full&nbsp;Potential.</h2>
          </HeroTextWrapper>

          <ElipseWrapper>
            <img
              src="/assets/images/bg-images/Ellipse-bg.svg"
              alt="elipse bg image"
              width="250"
              height="193"
            />
          </ElipseWrapper>
        </LeftSideWrapper>
        <RightSideWrapper>
          <RightSideWrapperInner>
            <img
              src="/assets/images/fsf-logo-white-hires.png"
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
              <Link to="/about">Learn more</Link>
            </HeroLinkWrapper>

            <SocialButtonsWrapper>
              <SocialIconWrapper>
                <Link to="#">
                  <img
                    src="/assets/images/socials/github-icon.png"
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
                    src="/assets/images/socials/codepen.png"
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
                    src="/assets/images/socials/linkedin-icon-black.png"
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

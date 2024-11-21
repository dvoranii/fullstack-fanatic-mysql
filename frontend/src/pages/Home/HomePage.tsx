import {
  HomePageWrapper,
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
} from "./HomePage.styled";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import FSFLogo from "../../assets/images/fsf-logo-notext.png";
import FSFLogoWhite from "../../assets/images/fsf-logo-white-hires.png";
import ElipseBG from "../../assets/images/Ellipse-bg.svg";

const HomePage: React.FC = () => {
  const { profile } = useContext(UserContext) || {};

  return (
    <HomePageWrapper>
      {!profile && <Link to="register">No account? Sign up!</Link>}

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
    </HomePageWrapper>
  );
};

export default HomePage;

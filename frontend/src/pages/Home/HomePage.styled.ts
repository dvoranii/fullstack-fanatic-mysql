import styled from "styled-components";
import { colors } from "../../GlobalStyles";
import WaveEffectBG from "../../assets/images/wave-effect-bg.jpg";

export const HomePageWrapper = styled.div`
  height: 100vh;
  display: flex;
  position: relative;
`;
export const LeftSideWrapper = styled.div`
  width: 50%;
  height: 100%;
  align-content: center;
  position: relative;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.75),
      rgba(255, 255, 255, 0.75)
    ),
    url(${WaveEffectBG});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
export const RightSideWrapper = styled.div`
  width: 50%;
  height: 100%;
  background-color: ${colors.secondary};
  position: relative;
`;

export const RightSideWrapperInner = styled.div`
  height: 100%;
  align-content: center;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  user-select: none;

  .orange-logo {
    width: 500px;
  }

  .white-logo {
    position: absolute;
    opacity: 0.4;
    top: 0;
    right: 0;
    width: 60px;
    margin: 20px;
  }
`;
export const ElipseWrapper = styled.div`
  position: absolute;
  bottom: -10px;
  left: 0;
  user-select: none;

  img {
    width: 250px;
  }
`;

export const HeroTextWrapper = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: "Anybody", sans-serif;
    font-size: 3.2rem;
    text-transform: uppercase;
    color: ${colors.black};
    font-weight: 500;
  }

  h2 {
    font-family: "Roboto", sans-serif;
    color: ${colors.black};
    font-weight: 400;
    font-size: 1.8rem;
  }
`;

export const HeroButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  /* might need to change to link */
  button {
    margin-top: 1.2rem;
    padding: 8px 16px;
    font-size: 1rem;
    border-radius: 20px;
    border: none;
    text-transform: uppercase;
    font-family: "ZenKakuGothicNewBold";
    background-color: ${colors.primary};
    color: ${colors.white};
    letter-spacing: 1px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
    transition: all 250ms ease;

    &:hover {
      box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
      transform: scale(1.01) translateY(-2px);
      cursor: pointer;
    }
  }
`;

export const TriangleArrowWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: absolute;
  right: calc((50%) - 30px);
  bottom: 100px;
`;

export const TriangleArrow = styled.div`
  height: 40px;
  width: 60px;
  background-color: black;
  clip-path: polygon(50% 100%, 0 0, 100% 0);
`;

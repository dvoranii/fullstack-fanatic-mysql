import styled, { keyframes } from "styled-components";
import { colors } from "../../../GlobalStyles";
import WaveEffectBG from "../../../assets/images/wave-effect-bg.jpg";

export const HeroWrapper = styled.section`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  position: relative;

  &.mobile-hero {
    flex-direction: column;
    height: 85vh;
  }
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
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, black, transparent);
    pointer-events: none;
  }
`;

export const RightSideWrapper = styled.div`
  width: 50%;
  height: 100%;
  background-color: ${colors.secondary};
  position: relative;
  user-select: none;
`;

export const RightSideWrapperInner = styled.div`
  height: 100%;
  align-content: center;
  position: relative;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  user-select: none;

  .orange-logo {
    width: clamp(150px, 30vw, 400px);
  }

  .white-logo {
    position: absolute;
    opacity: 0.4;
    top: 0;
    right: 0;
    width: 60px;
    margin: 20px;
  }

  @media screen and (max-width: 760px) {
    padding-top: 3.2rem;
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
    font-size: clamp(2.2rem, 3vw, 3.6rem);
    text-transform: uppercase;
    color: ${colors.black};
    font-weight: 500;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  }

  h2 {
    font-family: "Roboto", sans-serif;
    color: #222;
    font-weight: 600;
    opacity: 0.9;
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    text-transform: uppercase;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
    margin-top: -16px;
  }

  @media screen and (max-width: 760px) {
    padding-top: 3.2rem;
    h1,
    h2 {
      color: ${colors.primary};
    }
  }
`;

export const HeroButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    margin-top: 2.4rem;
    padding: 16px 32px;
    font-size: 1.2rem;
    border-radius: 30px;
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

    @media screen and (max-width: 760px) {
      margin-top: 120px;
      padding: 24px 48px;
      border-radius: 50px;
      font-size: 1.8rem;
    }
  }
`;

export const TriangleArrowWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: absolute;
  right: 50%;
  bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const fadeInDownOut = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  60% {
    transform: translateY(20px);
    opacity: 1;
  }
  100% {
    transform: translateY(40px);
    opacity: 0;
  }
`;

export const TriangleArrow = styled.div`
  height: 20px;
  width: 40px;
  background-color: ${colors.primary};
  clip-path: polygon(50% 100%, 0 0, 100% 0);
  position: absolute;
  animation: ${fadeInDownOut} 1.25s ease-in-out infinite;
`;

export const TriangleArrowSecond = styled(TriangleArrow)`
  top: -8px;
  animation: ${fadeInDownOut} 1.25s ease-in-out infinite;
  animation-delay: 0.2s;
  opacity: 0.8;
`;

export const TriangleArrowThird = styled(TriangleArrow)`
  top: -16px;
  animation: ${fadeInDownOut} 1.25s ease-in-out infinite;
  animation-delay: 0.4s;
  opacity: 0.6;
`;

export const SocialButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0%;
  padding-bottom: 3.6rem;
  user-select: none;

  @media screen and (max-width: 760px) {
    bottom: 10%;
  }
`;
export const SocialIconWrapper = styled.div`
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  padding: 4px;
  position: relative;

  transition: all 250ms ease;
  &:hover {
    filter: brightness(1.25);
    cursor: pointer;
    transform: translateY(-4px);
  }

  img {
    width: 40px;
  }

  a {
    height: 40px;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 5px;
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    transition: all 300ms ease;
  }

  &:hover {
    &::after {
      width: 95%;
      height: 8px;
      background-color: rgba(0, 0, 0, 0.1);
      filter: blur(1px);
      bottom: -16px;
    }
  }
`;

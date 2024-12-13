import { styled } from "styled-components";
import { colors } from "../../../GlobalStyles";
import elegantWhiteBg from "../../../assets/images/elegant-white-bg.jpg";

export const CTAWrapperOuter = styled.div`
  height: 100%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      to right,
      ${colors.primary} 0%,
      ${colors.primary} 35%,
      ${colors.white} 45%,
      ${colors.white} 100%
    );
    pointer-events: none;
  }
`;
export const CTAWrapperInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  height: 100%;
  margin: 0 auto;

  @media screen and (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const ImgWrapper = styled.div`
  grid-column: 1;
  width: 100%;
  user-select: none;
  width: 100%;
  display: flex;
  justify-content: center;
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    url(${elegantWhiteBg});
  background-size: cover;
  background-repeat: no-repeat;

  img {
  }
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

export const BrainImg = styled.img`
  max-width: 100%;
  height: auto;
  width: clamp(250px, 50vw, 500px);
  padding: 20px;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  min-width: 820px;
  background: linear-gradient(
    180deg,
    rgba(20, 33, 61, 1) 29%,
    rgba(13, 21, 40, 1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 40px;

  h2 {
    font-family: "Alata", sans-serif;
    letter-spacing: 2px;
    color: ${colors.white};
    font-size: clamp(2.2rem, 4vw, 3rem);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  }

  h3 {
    font-family: "Abel";
    font-weight: 100;
    color: ${colors.white};
    font-size: clamp(1.8rem, 3vw, 2.4rem);
  }

  @media screen and (max-width: 1100px) {
    padding: 80px 40px;
  }

  @media screen and (max-width: 768px) {
    min-width: 100%;
  }
`;

export const TextWrapper = styled.div`
  text-align: center;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 2.4rem;
  padding-top: 1.2rem;
  user-select: none;
  @media screen and (max-width: 525px) {
    gap: 1.2rem;
  }
`;
export const CTAButton = styled.button`
  padding: 16px 32px;
  background-color: ${colors.secondary};
  font-family: "Anybody";
  font-weight: bold;
  font-size: 1.8rem;
  border: none;
  border-radius: 30px;
  color: ${colors.primary};
  font-style: italic;
  margin-top: 1.2rem;
  transition: all 600ms ease;

  &:hover {
    background-color: white;
  }

  span {
    background-image: linear-gradient(
      to right,
      ${colors.primary},
      #175bb5,
      ${colors.primary}
    );
    background-size: 200%;
    background-position: 0%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    padding: 0.4rem;
    transition: all 0.6s ease-in-out;
  }

  &:hover span {
    background-position: -100%;
    filter: brightness(1.5);
  }

  @media screen and (max-width: 525px) {
    padding: 12px 24px;
  }
`;

export const SubtextWrapper = styled.div`
  width: 65%;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

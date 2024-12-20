import styled, { css } from "styled-components";
import { colors } from "../../../../GlobalStyles";

interface CardWrapperProps {
  highlighted?: boolean;
}

interface PriceTagProps {
  highlighted?: boolean;
}
interface CardTitleProps {
  highlighted?: boolean;
}
interface CardTitleWrapperProps {
  highlighted?: boolean;
}

interface SubscribeButtonProps {
  highlighted?: boolean;
}

export const CardWrapper = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "highlighted",
})<CardWrapperProps>`
  position: relative;
  background: ${({ highlighted }) => (highlighted ? "#14213D" : "white")};
  color: ${({ highlighted }) => (highlighted ? "white" : "inherit")};
  border-bottom-left-radius: 25px;
  box-shadow: ${({ highlighted }) =>
    highlighted
      ? "0px 8px 35px rgba(255, 175, 43, 0.3)"
      : "0px 4px 15px rgba(0, 0, 0, 0.2)"};
  width: 300px;
  margin: 20px;

  ${({ highlighted }) =>
    highlighted &&
    `
    width: 350px;
    height: 500px;
  `}
  ${({ highlighted }) =>
    !highlighted &&
    `
    transform: translateY(30px); 
  `}

@media screen and (max-width: 739px) {
    width: clamp(300px, 60vw, 450px);
    height: auto;
    transform: translateY(0px);
  }
`;

export const MedalWrapper = styled.div`
  position: absolute;
  top: -50px;
  right: -270px;
  width: 100%;
  height: 80px;
  user-select: none;

  img {
    width: 120px;
    height: auto;
    z-index: 1;
  }

  @media screen and (max-width: 739px) {
    left: 50%;
    transform: translateX(-60px) translateY(-20px);
    /* transform: translateX(-50%); */
  }
`;

export const CardTitleWrapper = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "highlighted",
})<CardTitleWrapperProps>`
  width: 100%;

  margin-top: 1.2rem;
  display: flex;
  justify-content: center;

  ${({ highlighted }) =>
    highlighted &&
    `
      border-top: 8px solid white;
  `}
`;

export const CardTitle = styled("h3").withConfig({
  shouldForwardProp: (prop) => prop !== "highlighted",
})<CardTitleProps>`
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: bold;
  padding-top: 0.8rem;
  text-align: center;
  font-family: "Anybody";
  ${({ highlighted }) =>
    highlighted &&
    `
    border-bottom: 2px solid white;
  `}
`;

export const CardFeatures = styled.ul`
  list-style: none;
  margin: 15px 0;
  text-align: left;
  padding: 0 20px 20px 20px;

  li {
    margin-bottom: 10px;
    font-size: 0.9rem;
  }
`;

export const PriceTag = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "highlighted",
})<PriceTagProps>`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  color: ${({ highlighted }) =>
    highlighted ? `${colors.white}` : `${colors.primary}`};
  background: ${({ highlighted }) =>
    highlighted
      ? `linear-gradient(
          180deg,
          rgba(255, 175, 43, 1) 10%,
          rgba(255, 222, 166, 1) 50%,
          rgba(255, 175, 43, 1) 83%
        )`
      : `${colors.secondary}`};
  padding: 10px;
  margin: 20px 0;
  ${({ highlighted }) =>
    highlighted &&
    `
      text-shadow: 1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black;
      letter-spacing: 2px;
      border-top: 2px solid white;
      border-bottom: 2px solid white;
    `}

  span {
    font-size: 1rem;
    font-weight: normal;
  }
`;

export const SubscribeButtonWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 739px) {
    padding-top: 0;
  }
`;

export const SubscribeButton = styled("button").withConfig({
  shouldForwardProp: (prop) => prop !== "highlighted",
})<SubscribeButtonProps>`
  background-color: lightgrey;
  color: ${({ highlighted }) =>
    highlighted ? `${colors.primary}` : `${colors.primary}`};
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s, transform 0.3s;
  font-weight: bold;

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #ccc;
      color: #666;
      cursor: not-allowed;

      &:hover,
      &:active,
      &:focus {
        background-color: #ccc;
        color: #666;
        transform: none;
      }
    `}

  &:hover {
    ${({ disabled, highlighted }) =>
      !disabled &&
      (highlighted
        ? `
          background-color: white;
          color: ${colors.primary};
          transform: translateY(-4px) scale(1.01);
        `
        : `
          background-color: ${colors.primary};
          color: ${colors.white};
        `)}
  }
`;

export const MedalImage = styled.img`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 80px !important;
  height: auto;
  z-index: 1;
`;

export const CardFeature = styled.ul`
  list-style: none;
  margin: 15px 0;
  text-align: left;
  padding: 0 20px 20px 20px;

  li {
    margin-bottom: 15px;
  }
`;

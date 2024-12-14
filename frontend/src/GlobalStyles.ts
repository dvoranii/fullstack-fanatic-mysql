import { createGlobalStyle } from "styled-components";
import ZenKakuGothicNewRegular from "./assets/fonts/ZenKakuGothicNew-Regular.ttf";
import ZenKakuGothicNewMedium from "./assets/fonts/ZenKakuGothicNew-Medium.ttf";
import ZenKakuGothicNewBold from "./assets/fonts/ZenKakuGothicNew-Bold.ttf";
import AlataRegular from "./assets/fonts/Alata-Regular.ttf";
import AnybodyMedium from "./assets/fonts/Anybody-Medium.ttf";
import AnybodySemiBold from "./assets/fonts/Anybody-SemiBold.ttf";
import AnybodyBold from "./assets/fonts/Anybody-Bold.ttf";
import AbelRegular from "./assets/fonts/Abel-Regular.ttf";

export const colors = {
  primary: "#14213D",
  primary_hover: "#0047BE",
  secondary: "#FFAF2B",
  white: "#fefefe",
  black: "#222222",
  background: "#eeeeee",
};

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "ZenKakuGothicNewRegular";
    src: url(${ZenKakuGothicNewRegular}) format("truetype");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "ZenKakuGothicNewMedium";
    src: url(${ZenKakuGothicNewMedium}) format("truetype");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "ZenKakuGothicNewBold";
    src: url(${ZenKakuGothicNewBold}) format("truetype");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Alata";
    src: url(${AlataRegular}) format("truetype");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Anybody";
    src: url(${AnybodyMedium}) format("truetype");
    font-weight: 400;
    font-style:normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Anybody";
    src: url(${AnybodySemiBold}) format("truetype");
    font-weight: 500;
    font-style:normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Anybody";
    src: url(${AnybodyBold}) format("truetype");
    font-weight: 700;
    font-style:normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Abel";
    src: url(${AbelRegular}) format("truetype");
    font-weight: 400;
    font-style:normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *::before,
  *::after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: ${colors.secondary};
    color: ${colors.primary};
  }
  html,
  body {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }

  body {
    font-family: "ZenKakuGothicNewRegular", Arial, Helvetica, sans-serif;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    line-height: 1.6;
    color: #14213d;
  }


  a {
    text-decoration: none;
    color: inherit;
  }

  p, ul, li {
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.6;
}


  button {
    font-family: inherit;
    cursor: pointer;
  }

  ::placeholder {
    font-family:"ZenKakuGothicNewRegular", Arial, Helvetica, sans-serif; ;
  }
`;

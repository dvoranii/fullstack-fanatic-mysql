import styled from "styled-components";
import ZenKakuGothicNewRegular from "./assets/fonts/ZenKakuGothicNew-Regular.ttf";
import ZenKakuGothicNewMedium from "./assets/fonts/ZenKakuGothicNew-Medium.ttf";

export const colors = {
  secondary: "#ffb923",
  white: "#ffffff",
  primary: "#14213d",
  background: "#e5e5e5",
};

export const PageWrapper = styled.div`
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

  max-width: 80vw;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  font-family: "ZenKakuGothicNewRegular", sans-serif;
`;

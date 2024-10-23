import styled from "styled-components";

export const PageBGWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
  }

  img:nth-child(1) {
    width: 170vh;
    left: -420px;
    top: 7%;
    transform: rotate(0deg);
    z-index: -1;
  }

  img:nth-child(2) {
    right: -4%;
    top: 20%;
    width: 20%;
  }
`;

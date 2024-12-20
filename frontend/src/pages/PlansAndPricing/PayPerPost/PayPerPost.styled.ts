import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

export const PayPerPostWrapper = styled.section`
  width: 100%;
  padding-top: 4.2rem;
  position: relative;

  @media screen and (max-width: 987px) {
    padding-top: 0;
  }

  @media screen and (max-width: 413px) {
    .pay-per-post-title {
      transform: scale(0.8);
    }
  }
`;

export const PayPerPostTextWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
  font-family: "Roboto";
  padding: 0 1.2rem 4.2rem 1.2rem;

  p {
    margin-top: 10px;
    line-height: 1.5;
  }

  ul {
    margin-inline-start: 36px;
    margin-top: 10px;

    li {
      a {
        border-bottom: 1px solid black;
        color: ${colors.primary};
        transition: all 250ms ease;

        &:hover {
          color: ${colors.secondary};
          border-bottom: 1px solid ${colors.secondary};
        }
      }
    }
  }

  @media screen and (max-width: 987px) {
    width: 95%;
  }
`;

export const SwirlyImgBgWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;

  .swirly-2 {
    position: absolute;
    right: -20px;
    top: -100px;
    width: clamp(180px, 15%, 300px);
  }
`;

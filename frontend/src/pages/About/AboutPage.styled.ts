import styled from "styled-components";
import { colors } from "../../GlobalStyles";

export const AboutIntroWrapperOuter = styled.div`
  position: relative;
  padding: 0 20px;
  height: 72vh;

  .elipse {
    position: absolute;
    transform: scaleX(-1);
    width: 200px;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

  .squares-triangle {
    position: absolute;
    top: 0;
    left: 80px;
    width: 250px;
    transform: scaleX(-1);
    z-index: -1;
  }

  @media screen and (max-width: 548px) {
    .squares-triangle {
      left: -3px;
      width: 40vw;
      top: 260px;
    }
  }
`;

export const ImgWrapper = styled.div`
  user-select: none;
`;
export const AboutIntroWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 600px;
  gap: 2.4rem;

  @media screen and (max-width: 548px) {
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
`;

export const AboutImageWrapper = styled.div`
  user-select: none;
  order: 0;
  img {
    width: clamp(200px, 26vw, 500px);
  }

  @media screen and (max-width: 548px) {
    order: 2;

    img {
      width: 65vw;
    }
  }
`;
export const LinkWrapper = styled.div`
  margin-top: 1.2rem;
  transition: all 250ms ease;
  user-select: none;
  width: fit-content;

  &:hover {
    transform: translateY(-2px);
  }

  a {
    padding: 12px 24px;
    margin-top: 1.2rem;
    font-size: 1.2rem;
    font-family: "Anybody";
    border-radius: 30px;
    background-color: ${colors.secondary};
    color: ${colors.primary};
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transition: all 250ms ease;

    &:hover {
      cursor: pointer;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
    }
  }
`;
export const MissionStatementWrapper = styled.div`
  font-size: 1.4rem;
  order: 1;

  h2 {
    font-size: clamp(1.4rem, 4vw, 2.4rem);
  }

  @media screen and (max-width: 548px) {
    order: 1;
  }
`;

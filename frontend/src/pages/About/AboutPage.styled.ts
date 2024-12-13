import styled from "styled-components";
import { colors } from "../../GlobalStyles";
import HexagonalBg from "../../assets/images/hexagonal-line-bg.jpg";

interface ListSectionTitleWrapperProps {
  offset?: string;
  width?: string;
}

export const AboutPageWrapper = styled.div``;

export const AboutIntroWrapperOuter = styled.div`
  position: relative;
  padding: 0 20px;

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

export const CoreTenetsWrapper = styled.div`
  width: 100%;
  font-size: 1.4rem;
  background: rgba(0, 0, 0, 0.035);
  background-image: linear-gradient(
      rgba(245, 245, 245, 1),
      rgba(255, 255, 255, 0.88)
    ),
    url(${HexagonalBg});
  background-size: cover;
  background-repeat: no-repeat;
  padding: 2.4rem 1.2rem 8.4rem 1.2rem;
  position: relative;

  .elipse-solid {
    position: absolute;
    bottom: 0;
    transform: scaleX(-1);
    width: 170px;
    opacity: 0.9;
  }
  h3 {
    text-align: center;
    font-size: clamp(1.4rem, 2vw, 1.8rem);
    font-weight: bold;
    color: ${colors.primary};
    padding-bottom: 1.2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    width: fit-content;
    margin: 0 auto 2.4rem auto;
    font-family: "Anybody", sans-serif;
  }

  ol {
    margin-inline-start: 1.2rem;
    margin-top: 1.2rem;

    li {
      padding-top: 1.2rem;
    }

    div {
      font-weight: 100;
      margin-top: 0.5rem;
    }
  }
`;

export const CoreTenetsWrapperInner = styled.div`
  display: flex;
  gap: 2.4rem;
  padding-top: 1.2rem;
  max-width: 1400px;
  padding: 0 20px;
  margin: 0 auto;

  @media screen and (max-width: 656px) {
    flex-direction: column;
  }
`;

export const ListSectionTitleWrapper = styled.div<ListSectionTitleWrapperProps>`
  width: fit-content;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  h4 {
    text-align: center;
    width: fit-content;
    position: relative;
    z-index: 2;
    font-size: clamp(1.4rem, 2vw, 1.8rem);
    border-bottom: 2px solid ${colors.primary};
  }
`;
export const TenetListSection = styled.div``;

export const TenetLisItemTitle = styled.p`
  font-weight: bold;
`;

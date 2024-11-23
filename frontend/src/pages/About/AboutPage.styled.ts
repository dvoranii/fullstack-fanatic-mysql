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
  height: 70vh;
  gap: 2.4rem;
`;

export const AboutImageWrapper = styled.div`
  user-select: none;
  img {
    width: clamp(250px, 26vw, 500px);
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
  padding-bottom: 8.4rem;
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
    font-size: 1.6rem;
    font-weight: bold;
    color: ${colors.primary};
    padding-bottom: 2.4rem;
    margin: 4.2rem auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    margin-bottom: 2.4rem;
    font-family: "Anybody", sans-serif;
    width: 70%;
  }

  ol {
    margin-inline-start: 1.2rem;
    margin-top: 2.4rem;

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
`;

export const ListSectionTitleWrapper = styled.div<ListSectionTitleWrapperProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;

  h4 {
    text-align: center;
    width: fit-content;
    position: relative;
    z-index: 2;
    font-size: 1.8rem;
  }
  &::after {
    content: "";
    position: absolute;
    width: ${(props) => props.width || "114px"};
    height: 20px;
    background-color: #ccc;
    border-radius: 2px;
    z-index: 1;
    bottom: 0px;
    right: ${(props) => props.offset || "172px"};
  }
`;
export const TenetListSection = styled.div``;

export const TenetLisItemTitle = styled.p`
  font-weight: bold;
`;

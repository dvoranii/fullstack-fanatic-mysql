import { styled } from "styled-components";
import { colors } from "../../../GlobalStyles";
import { Link } from "react-router-dom";

export const ProductsAndServiceTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ProductsAndServiceTitle = styled.h2`
  position: relative;
  padding: 1rem;
  margin-top: 6.4rem;
  text-align: center;
  color: #222;
  font-family: "Anybody";
  font-size: 2.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
  width: fit-content;
  user-select: none;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    bottom: 25px;
    right: 0px;
    width: 160px;
    height: 25px;
    background-color: #ffb923;
    border-radius: 2px;
    z-index: -1;
  }

  @media screen and (max-width: 466px) {
    &::after {
      width: 100px;
      right: 100px;
    }
  }

  @media screen and (max-width: 400px) {
    &::after {
      width: 100px;
      right: 80px;
    }
  }
`;

export const ProductsAndServicesWrapperOuter = styled.section`
  position: relative;
  width: 100%;
  padding: 0px 60px 80px 60px;

  .bg-squares {
    user-select: none;
    transform: scaleX(-1);
  }

  @media screen and (max-width: 400px) {
    padding: 0px 20px 40px 20px;
  }
`;
export const ProductsAndServicesWrapperInner = styled.div`
  max-width: 1800px;
  justify-content: center;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  gap: 3.2rem;

  @media screen and (max-width: 1100px) {
    gap: 2.4rem;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    row-gap: 5.4rem;

    .consult-card {
      grid-row: 2;
      grid-column: span 2;
      margin: 0 auto;
      width: clamp(300px, 50vw, 450px);
    }
  }

  @media screen and (max-width: 860px) {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: 1fr;

    .consult-card {
      grid-column: 1;
      grid-row: 3;
    }

    .card {
      width: clamp(350px, 60vw, 450px);
      margin: 0 auto;
    }
  }
`;

export const CardWrapper = styled.div`
  width: 100%;
  position: relative;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  .top-icon {
    user-select: none;
    position: absolute;
    top: -50px;
    right: calc((50%) - 32.5px);
    width: 70px;
    height: auto;
  }
  .top-icon.consult-icon {
    width: 90px;
    height: auto;
    right: calc((50%) - 45px);
  }

  @media screen and (max-width: 1100px) {
    min-height: 450px;
  }

  @media screen and (max-width: 400px) {
    width: 80vw;
  }
`;
export const Card = styled.div`
  padding-top: 2.4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-wrap: break-word;
  word-break: break-word;

  h3 {
    text-transform: uppercase;
    text-align: center;
    font-family: "Anybody", sans-serif;
    letter-spacing: 1px;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid grey;
    font-size: 1.6rem;
  }
`;

export const CardList = styled.ul`
  color: ${colors.secondary};
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    position: relative;
    padding: 10px 20px;
    background-color: #eee;

    &:nth-child(odd) {
      background-color: #fff;
    }

    &:last-child {
      border-bottom-right-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    &::before {
      content: "•";
      position: absolute;
      left: 10px;
      color: ${colors.secondary};
      font-size: 2.4rem;
    }
  }

  li span {
    display: inline-block;
    margin-left: 20px;
    color: black;
  }
`;

export const CardImagesWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  user-select: none;

  img {
    width: 90%;
    height: auto;
  }

  @media screen and (max-width: 759px) {
    img {
      margin-top: 30px;
    }
  }
`;

export const ProductsAndServicesBottomImgWrapper = styled.div`
  width: 100%;
  display: flex;

  img {
    width: 100%;
    height: auto;
    z-index: 99;
  }

  @media screen and (max-width: 915px) {
    width: 150%;
    display: flex;
    margin-left: -200px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 0;
    width: 156%;
    margin-left: -120px;
  }
`;

export const CardLink = styled(Link)`
  padding: 8px 16px;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  text-decoration: none;
  border-radius: 20px;
  width: fit-content;
  margin: 20px auto;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: 700;
  font-family: "Roboto";
  transition: all 250ms ease;

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;

export const BgSquaresAndTriangleImg = styled.img``;

// export const BannerBottom = styled.div`
//   width: 100%;
//   height: 100px;
//   display: grid;
//   grid-template-columns: 1fr 1.35fr;
//   z-index: -1;
// `;

// export const LeftSide = styled.div``;
// export const RightSide = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: ${colors.primary};
// `;

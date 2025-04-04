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
  color: ${colors.primary};
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
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
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  gap: 2rem;

  @media screen and (max-width: 1100px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2.4rem;

    > div {
      /* Calculate width to match exactly 2 cards per row */
      width: calc(50% - 1.2rem); /* 50% minus half the gap */
      max-width: 450px;
      min-width: 300px;
    }

    .consult-card {
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 860px) {
    display: grid;
    grid-template-columns: minmax(300px, 1fr);

    > div {
      width: 100%;
      max-width: 450px;
    }
  }
`;

export const CardWrapper = styled.div`
  width: 100%;
  margin: 30px auto;
  position: relative;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

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
    color: #222;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
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
  margin-bottom: -2%;

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
  @media screen and (max-width: 568px) {
    width: 196%;
    margin-left: -220px;
  }
`;

export const CardLink = styled(Link)`
  padding: 8px 16px;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  text-decoration: none;
  border-radius: 4px;
  width: fit-content;
  margin: 40px auto;
  margin-bottom: 40px;
  text-transform: uppercase;
  font-weight: 700;
  font-family: "Roboto", sans-serif;
  transition: all 250ms ease;

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;

export const BgSquaresAndTrianglesWrapper = styled.div`
  user-select: none;
`;

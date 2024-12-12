import { styled } from "styled-components";
import { colors } from "../../../GlobalStyles";

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
  padding: 80px 20px;
  padding-top: 6.4rem;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;
export const ProductsAndServicesWrapperInner = styled.div`
  max-width: 1400px;
  justify-content: center;
  margin: 0 auto;
  display: flex;
  gap: 3.2rem;

  @media screen and (max-width: 985px) {
    gap: 1.4rem;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: fit-content;
    gap: 6.4rem;
  }
`;

export const CardWrapper = styled.div`
  width: clamp(200px, 50vw, 400px);
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

  @media screen and (max-width: 759px) {
    width: 80vw;
  }

  @media screen and (max-width: 400px) {
    width: 80vw;
  }
`;
export const Card = styled.div`
  padding-top: 2.4rem;
  height: 100%;

  h3 {
    text-transform: uppercase;
    text-align: center;
    font-family: "Anybody", sans-serif;
    letter-spacing: 1px;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid grey;
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
  padding-top: 4.2rem;
  padding-bottom: 2.4rem;

  img {
    width: 100%;
    height: auto;
  }

  @media screen and (max-width: 768px) {
    padding-top: 0;
    width: 156%;
    margin-left: -120px;
  }
`;

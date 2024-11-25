import { styled } from "styled-components";
import { colors } from "../../../GlobalStyles";

export const ProductsAndServicesWrapperOuter = styled.section`
  position: relative;
  width: 100%;
  padding: 80px 20px;
  display: flex;
  align-items: center;
  padding-top: 6.4rem;
`;
export const ProductsAndServicesWrapperInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 3.2rem;

  @media screen and (max-width: 759px) {
    flex-direction: column;
    height: fit-content;
    gap: 6.4rem;
  }
`;

export const CardWrapper = styled.div`
  max-height: 600px;
  width: clamp(200px, 25vw, 400px);
  position: relative;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  .top-icon {
    user-select: none;
    position: absolute;
    top: -50px;
    right: calc((50%) - 32.5px);
    width: 70px;
  }
  .top-icon.consult-icon {
    width: 90px;
    right: calc((50%) - 45px);
  }

  @media screen and (max-width: 1100px) {
    min-height: 450px;
  }

  @media screen and (max-width: 759px) {
    width: 60vw;
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
  }

  @media screen and (max-width: 759px) {
    img {
      margin-top: 30px;
    }
  }
`;

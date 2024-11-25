import { styled } from "styled-components";
import { colors } from "../../../GlobalStyles";

export const ProductsAndServicesWrapperOuter = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
`;
export const ProductsAndServicesWrapperInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 2.4rem;
`;

export const CardWrapper = styled.div`
  height: fit-content;
  min-width: 200px;
  width: clamp(200px, 20vw, 450px);
  position: relative;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
  margin-top: -100px;
  border-radius: 20px;

  img {
    position: absolute;
    top: -50px;
    right: calc((50%) - 32.5px);
    width: 75px;
  }
  img.consult-icon {
    width: 90px;
    right: calc((50%) - 45px);
  }
`;
export const Card = styled.div`
  padding-top: 2.4rem;

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

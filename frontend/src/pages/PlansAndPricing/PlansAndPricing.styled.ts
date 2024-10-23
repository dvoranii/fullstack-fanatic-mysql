import styled from "styled-components";

export const PageBGWrapper = styled.div`
  width: 100vw;
  height: fit-content;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
  }

  img:nth-child(1) {
    width: 170vh;
    left: -200px;
    top: 7%;
    transform: rotate(0deg);
    z-index: -1;
  }

  img:nth-child(2) {
    right: -4%;
    top: 20%;
    width: 20%;
    z-index: -1;
  }

  ul {
    list-style: none;
    margin-inline-start: 20px;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const OneOffPricingSection = styled.div`
  height: 500px;
  background: white;
`;

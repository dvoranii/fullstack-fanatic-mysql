import styled from "styled-components";

export const PageBGWrapper = styled.div`
  width: 100vw;
  height: fit-content;
  overflow: hidden;
  position: relative;
  padding-bottom: 4.2rem;

  img {
    position: absolute;
  }

  .bg-swoosh {
    position: absolute;
    width: 170vh;
    left: -200px;
    top: 7%;
    transform: rotate(0deg);
    z-index: -1;
  }

  .bg-squares-and-triangles {
    position: absolute;
    right: -4%;
    top: 20%;
    width: 20%;
    z-index: -1;
  }

  ul {
    list-style: none;
    margin-inline-start: 20px;
  }

  @media screen and (max-width: 1139px) {
    .bg-swoosh {
      width: 120vh;
      top: 10%;
    }
  }

  @media screen and (max-width: 739px) {
    .bg-swoosh {
      left: -300px;
      top: 20%;
    }

    .bg-squares-and-triangles {
      width: 40%;
      right: -12%;
    }
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1400px;
  padding: 0px 40px;
  margin: 0 auto;
  place-items: center;
  margin-top: 40px;

  @media screen and (max-width: 1139px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    .premium {
      grid-column: span 2;
    }
    .first-card,
    .third-card {
      grid-row: 2;
    }
  }

  @media screen and (max-width: 739px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    .third-card {
      grid-row: 3;
    }
  }
`;

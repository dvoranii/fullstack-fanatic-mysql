import styled from "styled-components";

export const PageBGWrapper = styled.section`
  width: 100vw;
  height: fit-content;
  overflow: hidden;
  position: relative;
  padding-bottom: 4.2rem;

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
    top: 10%;
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

  @media screen and (max-width: 413px) {
    .plans-and-pricing-title {
      transform: scale(0.8);
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

  @media screen and (max-width: 413px) {
    padding: 0 10px;
  }
`;

export const SwirlyImgBgWrapper = styled.div`
  width: 100%;
  position: relative;
  .swirly-1 {
    width: clamp(180px, 15%, 300px);
    position: absolute;
    bottom: 0px;
    left: -30px;
    z-index: -1;
  }
`;

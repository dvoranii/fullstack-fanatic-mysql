import styled from "styled-components";

export const PlansAndPricingContainerOuter = styled.div`
  width: 100%;
`;
export const PageBGWrapper = styled.div`
  width: 100vw;
  height: fit-content;
  overflow: hidden;
  position: relative;
  padding-bottom: 4.2rem;

  .swirly-1 {
    width: 15%;
    position: absolute;
    bottom: 0px;
    left: -30px;
    z-index: -1;
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

export const PayPerPostWrapper = styled.div`
  width: 100%;
  padding-top: 4.2rem;
`;

export const PayPerPostTextWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
  font-family: "Roboto";
  padding: 0 1.2rem 4.2rem 1.2rem;

  p {
    margin-top: 10px;
    line-height: 1.5;
  }

  ul {
    margin-inline-start: 36px;
    margin-top: 10px;
  }

  @media screen and (max-width: 987px) {
    width: 95%;
  }
`;

export const ConsultationSectionWrapperInner = styled.div`
  font-family: "Roboto";
  width: 75%;
  margin: 0 auto;
  padding: 4.2rem 1.2rem 4.2rem 1.2rem;
  p {
    margin-top: 10px;
    line-height: 1.5;
  }

  ul {
    margin-inline-start: 40px;
    margin-top: 10px;
  }

  @media screen and (max-width: 987px) {
    width: 95%;
  }
`;

export const ConsultationSectionWrapperOuter = styled.div`
  position: relative;
  .bg-squares-and-triangles {
    width: 20%;
    position: absolute;
    top: 90px;
    left: -70px;
    transform: scaleX(-1);
    z-index: -1;
  }
`;

export const ScrollButton = styled.button`
  background: transparent;
  border: none;
  color: #3498db;
  text-decoration: none;
  font-size: 18px;
  border-bottom: 2px solid #3498db;

  &:hover {
    color: #2980b9;
  }
`;

export const SwirlyImgBgWrapper = styled.div`
  width: 100%;
  position: relative;
  .swirly-2 {
    position: absolute;
    right: -20px;
    top: -100px;
    width: 12%;
  }
`;

export const ConsultationContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2.2rem;

  @media screen and (max-width: 779px) {
    flex-direction: column;
  }
`;
export const ConsultationTextWrapper = styled.div``;
export const ConsultationImgWrapper = styled.div`
  user-select: none;
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    min-width: 370px;
  }
`;

export const ConsultFormTitleWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;

  h2 {
    font-family: "Anybody";
    text-transform: uppercase;
  }
`;

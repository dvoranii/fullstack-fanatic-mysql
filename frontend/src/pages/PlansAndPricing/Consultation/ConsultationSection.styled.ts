import styled from "styled-components";

export const ConsultationSectionWrapperInner = styled.div`
  font-family: "Roboto", sans-serif;
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
    padding-top: 0;
  }

  @media screen and (max-width: 413px) {
    .consultation-title {
      transform: scale(0.8);
    }
  }
`;

export const ConsultationSectionWrapperOuter = styled.div`
  position: relative;
  .bg-squares-and-triangles {
    width: clamp(200px, 20%, 350px);
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

  @media screen and (max-width: 567px) {
    width: 90%;
    justify-content: center;
  }
`;

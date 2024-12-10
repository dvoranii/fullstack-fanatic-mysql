import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

export const InfoSectionWrapper = styled.section`
  position: relative;
  background: linear-gradient(
    to bottom right,
    ${colors.secondary} 50%,
    #ffffff 50%
  );
  padding-bottom: 12.8rem;
`;
export const InfoSectionWrapperInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8.4rem;
  height: 100%;
  margin: 0 auto;
  padding-top: 6.8rem;

  @media screen and (max-width: 1320px) {
    gap: 4.8rem;
  }

  @media screen and (max-width: 1020px) {
    gap: 4.2rem;
  }

  @media screen and (max-width: 860px) {
    gap: 3.2rem;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 6.4rem;
  }
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  width: clamp(200px, 20vw, 300px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border-top-left-radius: 100px;
  position: relative;
  min-height: 300px;

  @media screen and (max-width: 1320px) {
    width: 25vw;
  }

  @media screen and (max-width: 1020px) {
    padding: 30px 15px;
  }

  @media screen and (max-width: 860px) {
    min-height: 270px;
  }

  @media screen and (max-width: 768px) {
    width: 50vw;
    min-height: 400px;
    padding: 40px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }

  @media screen and (max-width: 615px) {
    width: 70vw;
  }
`;

export const CardTitle = styled.h3`
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  color: ${colors.primary};
  margin-bottom: 10px;
  font-family: "ZenGakuGothicMedium", sans-serif;
  text-transform: uppercase;
  border-bottom: 2px solid black;
  width: fit-content;
  margin: 0 auto;
  font-family: "Anybody", sans-serif;

  @media screen and (max-width: 900px) {
    margin-bottom: 0;
  }

  @media screen and (max-width: 760px) {
    font-size: 1.8rem;
  }

  @media screen and (max-width: 525px) {
    font-size: 1.4rem;
  }
`;

export const CardContent = styled.p`
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  line-height: 1.5;
  color: #555;
  margin-bottom: 15px;
  padding-top: 1.2rem;
  text-align: center;

  @media screen and (max-width: 900px) {
    padding-top: 0.4rem;
  }

  @media screen and (max-width: 760px) {
    font-size: 1.4rem;
    margin-top: 1.2rem;
  }
`;

export const CardLinkWrapper = styled.div`
  position: absolute;
  margin-top: 20px;
  width: fit-content;
  bottom: 10px;
  left: 10px;
`;

export const CardLink = styled.a`
  color: ${colors.primary};
  text-decoration: none;
  font-weight: bold;
  font-family: "Anybody";
  position: relative;
  z-index: 1;
  padding: 0.5rem 1rem;
  transition: all 250ms ease;
  font-size: clamp(0.8rem, 1.5vw, 1.2rem);

  &:hover::after {
    width: 40%;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 6px;
    left: 50%;
    width: 0%;
    height: 12px;
    background-color: #ffb923;
    border-radius: 2px;
    z-index: -1;
    transition: all 250ms ease;
  }

  @media screen and (max-width: 900px) {
    padding: 0.25rem 0.25rem;
  }

  @media screen and (max-width: 760px) {
    font-size: 1rem;
  }
`;

export const CardImgWrapper = styled.div`
  position: absolute;
  width: clamp(130px, 15vw, 250px);
  right: -125px;
  bottom: -180px;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media screen and (max-width: 1320px) {
    right: -40px;
    bottom: -120px;
  }

  @media screen and (max-width: 1000px) {
    bottom: -80px;
  }

  @media screen and (max-width: 768px) {
    width: 35vw;

    &.card-3 {
      bottom: -100px;
    }
  }

  @media screen and (max-width: 768px) and (min-height: 1024px) {
    width: 35vw;
  }

  @media screen and (max-width: 525px) {
    width: 45vw;
  }
`;

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
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  width: clamp(200px, 20vw, 300px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border-top-left-radius: 100px;
  min-height: 350px;
  position: relative;
  min-height: 350px;

  @media screen and (max-width: 1320px) {
    width: 25vw;
  }

  @media screen and (max-width: 1020px) {
    padding: 30px 15px;
  }
`;

export const CardTitle = styled.h3`
  font-size: clamp(1.4rem, 2vw, 1.8rem);
  color: ${colors.primary};
  margin-bottom: 10px;
  font-family: "ZenGakuGothicMedium", sans-serif;
  text-transform: uppercase;
  border-bottom: 2px solid black;
  width: fit-content;
  margin: 0 auto;
  font-family: "Anybody", sans-serif;
`;

export const CardContent = styled.p`
  font-size: 1.4rem;
  line-height: 1.5;
  color: #555;
  margin-bottom: 15px;
  padding-top: 1.2rem;
  text-align: center;
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
`;

export const CardImgWrapper = styled.div`
  position: absolute;
  width: clamp(150px, 15vw, 250px);
  right: -125px;
  bottom: -140px;

  @media screen and (max-width: 1320px) {
    right: -40px;
    bottom: -100px;
  }
`;

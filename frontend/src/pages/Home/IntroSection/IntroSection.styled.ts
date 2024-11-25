import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

export const IntroSectionWrapper = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background-color: #fefefe;
  overflow: hidden;
  margin: 0 auto;
  padding-top: 12.8rem;
  padding-bottom: 12.8rem;
  /* height: 100vh; */
`;

export const ContentWrapper = styled.div`
  text-align: center;
  max-width: 700px;
  z-index: 2;
  margin-top: -120px;

  hr {
    margin-bottom: 1.2rem;
  }
`;

export const Title = styled.h2`
  font-family: "Alata", sans-serif;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.3;
  color: ${colors.black};
  margin-bottom: 20px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  padding-bottom: 1.2rem;

  span {
    font-family: "Roboto", sans-serif;
    color: ${colors.secondary};
    font-weight: 600;
    font-style: italic;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000, 1px 0 0 #000;
  }
`;

export const IntroText = styled.p`
  font-family: "Montserrat";
  font-size: 1.2rem;
  line-height: 1.5;
  color: #555;
  margin-bottom: 30px;
`;

export const GetStartedButton = styled.button`
  font-family: "Anybody", sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  padding: 16px 32px;
  font-size: 1.8rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.secondary};
    transform: translateY(-4px);
  }
`;

export const LeftGraphic = styled.img`
  position: absolute;
  left: 200px;
  bottom: 0;
  width: clamp(200px, 22vw, 390px);
  object-fit: contain;
  z-index: 1;
`;

export const ImageWrapper = styled.div`
  user-select: none;
`;

export const CornerEllipse = styled.img`
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 200px;
  object-fit: contain;
  z-index: 0;
  user-select: none;
`;

export const SwirlyArrow = styled.img`
  position: absolute;
  right: 17%;
  bottom: -70px;
  width: 120px;
  height: auto;
  object-fit: contain;
  z-index: 1;
`;

export const ButtonWrapper = styled.div`
  position: relative;
  user-select: none;
`;

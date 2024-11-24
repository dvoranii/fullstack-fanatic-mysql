import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

export const InfoSectionWrapper = styled.section`
  position: relative;
  height: 100vh;
  background: linear-gradient(
    to bottom right,
    ${colors.secondary} 50%,
    #ffffff 50%
  );
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
`;
export const InfoSectionWrapperInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8.4rem;
  height: 70%;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  width: clamp(250px, 30%, 15vw);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border-top-left-radius: 100px;
  min-height: 350px;
  position: relative;
`;

export const CardTitle = styled.h3`
  font-size: 1.8rem;
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
  width: 250px;
  right: -90px;

  &.card-3 {
    bottom: -140px;
    right: -210px;
    width: 270px;
  }
`;

// export const FootstepsWrapper = styled.div`
//   position: absolute;
//   bottom: 100px;
//   right: 260px;
//   img {
//     width: 400px;
//   }
// `;

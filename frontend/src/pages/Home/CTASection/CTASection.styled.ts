import { styled } from "styled-components";
import { colors } from "../../../GlobalStyles";

export const CTAWrapperOuter = styled.div`
  height: 100%;
`;
export const CTAWrapperInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  height: 100%;
  margin: 0 auto;
`;

export const ImgWrapper = styled.div`
  grid-column: 1;
  width: 100%;
  user-select: none;
  width: 100%;
  display: flex;
  justify-content: center;

  img {
  }
`;

export const BrainImg = styled.img`
  width: 450px;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${colors.primary};
`;

import styled from "styled-components";
import { colors } from "../../GlobalStyles";

interface TitleBannerWrapperProps {
  centered?: boolean;
}

export const TitleBannerWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "centered",
})<TitleBannerWrapperProps>`
  padding: 20px;
  background-color: ${colors.secondary};
  user-select: none;
  text-align: ${({ centered }) => (centered ? "center" : "left")};

  h1 {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: clamp(1.4rem, 3vw, 1.8rem);
  }
`;

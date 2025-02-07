import styled from "styled-components";
import { colors } from "../../GlobalStyles";

interface StyledTitleProps {
  pseudoBottom?: string;
  pseudoRight?: string;
  pseudoWidth?: string;
  pseudoHeight?: string;
  pseudoColor?: string;
  textColor?: string;
  fontWeight?: number;
}

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const StyledTitle = styled.h1.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "pseudoBottom",
      "pseudoRight",
      "pseudoWidth",
      "pseudoHeight",
      "pseudoColor",
      "textColor",
      "fontWeight",
    ].includes(prop),
})<StyledTitleProps>`
  position: relative;
  padding: 1rem;
  margin-top: 2.4rem;
  text-align: center;
  color: ${({ textColor }) => textColor || `${colors.primary}`};
  font-family: "Anybody", sans-serif;
  font-size: 2.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${({ fontWeight }) => fontWeight || 700};
  width: fit-content;
  user-select: none;
  z-index: 1;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);

  &::after {
    content: "";
    position: absolute;
    bottom: ${({ pseudoBottom }) => pseudoBottom || "25px"};
    right: ${({ pseudoRight }) => pseudoRight || "0"};
    width: ${({ pseudoWidth }) => pseudoWidth || "95px"};
    height: ${({ pseudoHeight }) => pseudoHeight || "25px"};
    background-color: ${({ pseudoColor }) =>
      pseudoColor || `${colors.secondary}`};
    border-radius: 2px;
    z-index: -1;
  }
`;

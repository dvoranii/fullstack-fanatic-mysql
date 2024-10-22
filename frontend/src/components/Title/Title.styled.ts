import styled from "styled-components";

interface StyledTitleProps {
  pseudoBottom?: string;
  pseudoRight?: string;
  pseudoWidth?: string;
  pseudoHeight?: string;
}

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const StyledTitle = styled.h1.withConfig({
  shouldForwardProp: (prop) =>
    !["pseudoBottom", "pseudoRight", "pseudoWidth", "pseudoHeight"].includes(
      prop
    ),
})<StyledTitleProps>`
  position: relative;
  padding: 1rem;
  margin-top: 2.4rem;
  text-align: center;
  color: #222;
  font-family: "Anybody";
  font-size: 2.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
  width: fit-content;
  user-select: none;

  &::after {
    content: "";
    position: absolute;
    bottom: ${({ pseudoBottom }) => pseudoBottom || "25px"};
    right: ${({ pseudoRight }) => pseudoRight || "0"};
    width: ${({ pseudoWidth }) => pseudoWidth || "95px"};
    height: ${({ pseudoHeight }) => pseudoHeight || "25px"};
    background-color: #ffb923;
    border-radius: 2px;
    z-index: -1;
  }
`;

import styled from "styled-components";

export const FavouriteButtonImg = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "isDisabled",
})<{ isDisabled?: boolean }>`
  width: 32px;
  height: auto;
  padding: 4px;
  transition: all 250ms ease;

  &:hover {
    filter: brightness(1.2);
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  }
`;

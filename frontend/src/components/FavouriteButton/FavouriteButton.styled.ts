import styled from "styled-components";

export const FavouriteButtonImg = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "isDisabled",
})<{ isDisabled?: boolean }>`
  width: 25px;

  &:hover {
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  }
`;

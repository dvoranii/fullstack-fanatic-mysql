import styled from "styled-components";

export const FavouriteButtonImg = styled.img<{ isDisabled?: boolean }>`
  width: 25px;

  &:hover {
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  }
`;

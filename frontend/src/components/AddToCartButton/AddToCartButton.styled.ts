import styled from "styled-components";

export const AddToCartWrapper = styled.div`
  user-select: none;

  button {
    border: none;
    background: transparent;
  }

  img {
    width: 35px;
    margin-left: 10px;
    margin-bottom: 5px;
    transition: all 150ms ease;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

import styled from "styled-components";

interface AddToCartWrapperProps {
  marginLeft?: string;
  marginBottom?: string;
}

export const AddToCartWrapper = styled.div<AddToCartWrapperProps>`
  user-select: none;

  button {
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
  }

  img {
    width: 35px;
    margin-left: ${(props) => props.marginLeft || "0px"};
    margin-bottom: ${(props) => props.marginBottom || "0px"};
    transition: all 150ms ease;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

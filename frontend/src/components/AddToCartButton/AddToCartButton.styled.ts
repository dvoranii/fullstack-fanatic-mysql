import styled from "styled-components";

interface AddToCartWrapperProps {
  margin?: string;
}

export const AddToCartWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["margin"].includes(prop),
})<AddToCartWrapperProps>`
  user-select: none;

  button {
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
  }

  img {
    width: clamp(20px, 10vw, 35px);
    margin: ${(props) => props.margin || "0px"};
    transition: all 150ms ease;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

import styled from "styled-components";
import { colors } from "../../../../GlobalStyles";

// export const LoginButtonWrapper = styled.div``;
export const LoginBtn = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: ${colors.primary};
  color: ${colors.white};
  text-transform: uppercase;
  transition: 150ms ease;

  &:hover {
    cursor: pointer;
    background-color: ${colors.secondary};
    color: ${colors.primary};
  }
`;

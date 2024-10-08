import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

export const SubmitButton = styled.button`
  padding: 10px;
  background-color: ${colors.secondary};
  font-size: 1.2rem;
  text-transform: uppercase;
  width: fit-content;
  margin: 10px auto;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  color: ${colors.white};
  font-weight: bold;
  box-shadow: 0px 4px 8px rgba(20, 33, 61, 0.4);
  user-select: none;
  transition: all 150ms ease;

  span {
    color: ${colors.white};
    text-shadow: -1px -1px 0 ${colors.black}, 1px -1px 0 ${colors.black},
      -1px 1px 0 ${colors.black}, 1px 1px 0 ${colors.black};
    letter-spacing: 2px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(20, 33, 61, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0px 4px 8px rgba(20, 33, 61, 0.4);
  }
`;

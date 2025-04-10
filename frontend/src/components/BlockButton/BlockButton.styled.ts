import styled from "styled-components";

interface BlockButtonProps {
  isblocked?: boolean;
}

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isblocked",
})<BlockButtonProps>`
  background-color: transparent;
  color:  ${(props) => (props.isblocked ? "grey" : " #c82333")};
  border: none;
  border-radius: 4px;
  padding: 0px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  span {
    border-bottom: ${(props) => (props.isblocked ? "1px solid #5a6268" : "1px solid  #c82333")};
    width: 10%;
  }

  &:hover {
    color: ${(props) => (props.isblocked ? "#111111" : "red")};
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;
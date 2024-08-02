import React from "react";
import { SubmitButton as StyledSubmitButton } from "./styles/SubmitButton.styled";

interface SubmitButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, text }) => (
  <StyledSubmitButton type="submit" onClick={onClick}>
    <span>{text}</span>
  </StyledSubmitButton>
);

export default SubmitButton;

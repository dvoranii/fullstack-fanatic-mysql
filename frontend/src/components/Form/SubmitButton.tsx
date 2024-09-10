import React from "react";
import { SubmitButton as StyledSubmitButton } from "./styles/SubmitButton.styled";

interface SubmitButtonProps {
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => (
  <StyledSubmitButton type="submit">
    <span>{text}</span>
  </StyledSubmitButton>
);

export default SubmitButton;

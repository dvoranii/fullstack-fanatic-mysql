import React from "react";
import { ErrorText } from "./styles/ErrorMessage.styled";

interface ErrorMessageProps {
  error: string | null;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  marginTop?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  textAlign = "center",
  fontSize = "0.8rem",
  marginTop = "10px",
}) => {
  if (!error) return null;
  return (
    <ErrorText textAlign={textAlign} fontSize={fontSize} marginTop={marginTop}>
      {error}
    </ErrorText>
  );
};

export default ErrorMessage;

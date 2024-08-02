import React from "react";
import { ErrorText } from "./styles/ErrorMessage.styled";

interface ErrorMessageProps {
  error: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;
  return <ErrorText>{error}</ErrorText>;
};

export default ErrorMessage;

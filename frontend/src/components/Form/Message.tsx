import React from "react";
import { MessageText } from "./styles/FormMessage.styled";

interface MessageProps {
  message: string | null;
  type?: "error" | "success";
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  marginTop?: string;
}

const FormMessage: React.FC<MessageProps> = ({
  message,
  type = "error",
  textAlign = "center",
  fontSize = "0.8rem",
  marginTop = "10px",
}) => {
  if (!message) return null;

  return (
    <MessageText
      type={type}
      textAlign={textAlign}
      fontSize={fontSize}
      marginTop={marginTop}
    >
      {message}
    </MessageText>
  );
};

export default FormMessage;

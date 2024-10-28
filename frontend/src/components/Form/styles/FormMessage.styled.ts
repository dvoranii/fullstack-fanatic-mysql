import styled from "styled-components";

export const MessageText = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["type", "textAlign", "fontSize", "marginTop"].includes(prop),
})<{
  type?: string;
  textAlign?: string;
  fontSize?: string;
  marginTop?: string;
}>`
  color: ${({ type }) => (type === "error" ? "red" : "green")};
  margin-top: ${({ marginTop }) => marginTop || "10px"};
  text-align: ${({ textAlign }) => textAlign || "center"};
  font-size: ${({ fontSize }) => fontSize || "0.8rem"};
`;

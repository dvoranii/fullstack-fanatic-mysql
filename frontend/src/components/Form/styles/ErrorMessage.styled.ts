import styled from "styled-components";

export const ErrorText = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["textAlign", "fontSize", "marginTop"].includes(prop),
})<{ textAlign?: string; fontSize?: string; marginTop?: string }>`
  color: red;
  margin-top: ${({ marginTop }) => marginTop || "10px"};
  text-align: ${({ textAlign }) => textAlign || "center"};
  font-size: ${({ fontSize }) => fontSize || "0.8rem"};
`;

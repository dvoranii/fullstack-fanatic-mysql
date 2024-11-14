import styled, { css } from "styled-components";

export const Badge = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "positionAbsolute",
})<{ positionAbsolute?: boolean }>`
  background-color: red;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 18px;
  height: 18px;

  ${({ positionAbsolute }) =>
    positionAbsolute
      ? css`
          position: absolute;
          top: 4px;
          right: 4px;
          font-size: 10px;
          width: 16px;
          height: 16px;
        `
      : css`
          font-size: 10pt;
        `}
`;

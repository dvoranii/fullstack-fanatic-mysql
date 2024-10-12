import styled, { keyframes } from "styled-components";

interface SpinnerProps {
  width: string;
  color: string;
}

const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

export const Spinner = styled.div<SpinnerProps>`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid ${({ color }) => color};
  border-radius: 50%;
  width: ${({ width }) => width};
  height: ${({ width }) => width};
  animation: ${spin} 1s linear infinite;
  position: absolute;
`;

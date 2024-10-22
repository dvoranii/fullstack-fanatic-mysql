import styled from "styled-components";

export interface PageWrapperProps {
  maxWidth?: string;
  padding?: string;
}

export const PageWrapper = styled.div<PageWrapperProps>`
  max-width: ${(props) => props.maxWidth || "80vw"};
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${(props) => props.padding || "20px"};
  box-sizing: border-box;
`;

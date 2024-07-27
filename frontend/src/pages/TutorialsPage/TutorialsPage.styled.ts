import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
  padding: 2rem;
  width: 50%;
  margin: 0 auto;
  height: 100vh;
`;

export const TutorialList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.2rem;
`;

export const TutorialThumbnail = styled(Link)`
  border: 1px solid #ddd;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  width: fit-content;
  box-sizing: border-box;

  &:hover {
    background: #f5f5f5;
  }

  h2 {
    margin-top: 0;
  }
`;

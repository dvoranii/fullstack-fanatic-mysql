import styled from "styled-components";
import { Link } from "react-router-dom";

export const BlogList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const BlogThumbnail = styled(Link)`
  display: block;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-decoration: none;
  color: inherit;
  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

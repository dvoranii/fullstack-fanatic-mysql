import styled from "styled-components";
import { Link } from "react-router-dom";

export const BlogList = styled.div`
  display: grid;
  row-gap: 1.2rem;
`;

export const BlogItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
`;

export const BlogContent = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  flex-grow: 1;

  h2 {
    margin: 0 0 10px 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #666;
  }
`;

export const BlogActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  min-width: 60px;

  .badge {
    background-color: #f0ad4e;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9rem;
  }
`;

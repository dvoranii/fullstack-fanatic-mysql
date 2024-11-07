// FavoritesSection.styled.ts
import styled from "styled-components";
import { colors } from "../../../GlobalStyles";
import { Link } from "react-router-dom";

export const FavoritesSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export const FavoritesItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 150ms ease;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const FavoriteIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 50%;
  margin-right: 12px;

  img {
    width: 30px;
    height: auto;
  }
`;

export const FavoriteTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ViewLink = styled(Link)`
  background-color: ${colors.primary};
  color: #fff;
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 150ms ease;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

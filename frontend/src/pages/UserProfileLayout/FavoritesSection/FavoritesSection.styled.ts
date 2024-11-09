import { styled } from "styled-components";

export const FavouritesContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  height: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const ViewAllButton = styled.button`
  background-color: #ffa500;
  border: none;
  color: white;
  padding: 4px 16px;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    background-color: #e69500;
  }
`;

export const FavouriteIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f5f5f5;
  border-radius: 50%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #007bff;

  img {
    width: 120%;
  }
`;

export const FavoritesDropdownWrapper = styled.div`
  width: 100%;
  display: flex;
  user-select: none;

  select {
    font-family: "Roboto";
    transition: all 150ms ease;
    &:hover {
      cursor: pointer;
      background-color: #eeeeee;
    }
    border: 1px solid black;
    border-radius: 4px;
    padding: 2px 4px;
    width: 20%;
    min-width: fit-content;
  }
`;

export const FavWrapper = styled.div`
  width: 30%;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 20px 40px;
  user-select: none;
`;

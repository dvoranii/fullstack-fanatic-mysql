import { styled } from "styled-components";

export const FavoritesWrapper = styled.div`
  height: 100%;
`;

export const FavouritesContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 2.4rem;
  height: 100%;
  padding-top: 1.2rem;

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
    font-family: "Roboto", sans-serif;
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
  width: 50%;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 20px 40px;
  user-select: none;

  /* @media screen and (max-width: 1291px) {
    margin-top: -100px;
  } */
`;

export const FilteredItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  margin-top: 20px;
  max-height: 320px;
  overflow-y: auto;

  div {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 12px;
    width: 80%;
    text-align: center;
    font-size: 16px;

    a {
      color: #007bff;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const BackButton = styled.button`
  background-color: #eee;
  border: none;
  color: #333;
  padding: 6px 12px;
  margin-bottom: 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  align-self: flex-start;
  display: flex;
  gap: 4px;
  transition: all 150ms ease;

  &:hover {
    background-color: #ccc;
    font-weight: bold;
  }

  img {
    width: 20px;
  }
`;

export const ViewHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

export const EmptyMessage = styled.div`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 20px;
`;

export const TopButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ScrollableDiv = styled.div`
  max-height: 520px;
  overflow-y: auto;
  padding: 0 16px;
  margin-top: 10px;
`;

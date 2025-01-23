import { styled } from "styled-components";

export const PurchaseHistoryPageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.8rem 1.2rem 12.8rem 1.2rem;

  label {
    font-weight: bold;
    letter-spacing: 0.25px;
  }
  select {
    margin-left: 0.5rem;
    cursor: pointer;
    padding: 0px 4px;
    height: 34px;
  }
`;

export const PurchaseHistoryListWrapper = styled.div`
  margin-top: 2.4rem;
`;

export const PurchaseHistoryListItemsWrapper = styled.div`
  padding: 12px;

  hr {
    margin-top: 1.2rem;
  }
`;
export const PurchaseHistoryList = styled.ul`
  list-style: none;
`;
export const PurchaseHistoryItem = styled.li`
  border: 1px solid black;
  margin: 12px;

  p {
    span {
      font-weight: bold;
    }
  }
`;

export const PurchaseHistoryItemBanner = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: lightgrey;
  padding: 0 8px 0 8px;

  p {
    font-family: "Roboto";
  }
  span {
    font-weight: bold;
  }
  h3 {
    text-transform: uppercase;
    font-family: "Anybody", sans-serif;
    font-weight: bold;
  }
`;

export const PurchaseHistorySortAndSearchWrapperOuter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 12px;

  .help-icon {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: default;

    img {
      width: 25px;
      display: flex;
    }
  }
`;
export const PurchaseHistorySortAndSearchWrapperInner = styled.div`
  display: flex;
  align-items: center;
`;

export const HelpIconWrapper = styled.div``;

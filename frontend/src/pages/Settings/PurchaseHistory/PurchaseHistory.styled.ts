import { styled } from "styled-components";
import { colors } from "../../../GlobalStyles";
import { Tooltip } from "../../../components/Tooltip/Tooltip.styled";
import SearchBar from "../../../components/SearchBar/SearchBar";

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

  @media screen and (max-width: 396px) {
   select {
      margin-left: 0;
   }
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
  margin-top: 2.4rem;
  background-color: #eee;
  border-radius: 12px;

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

  @media screen and (max-width: 396px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
`;

export const SeeMoreButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2.4rem;

  button {
    padding: 16px 32px;
    font-family: "Anybody";
    font-size: 1rem;
    text-transform: uppercase;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: ${colors.white};
  }
`;

export const HelpIcon = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: default;

  img {
    width: 16px;
  }

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }

    @media screen and (max-width: 520px) {
    display:none;
    }
`;

export const StyledSearchBar = styled(SearchBar)`
padding-left: 12px;

@media screen and (max-width: 396px) {
  padding-left: 0;
}
`;
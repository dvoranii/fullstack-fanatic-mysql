import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import {
  PurchaseHistoryPageWrapper,
  PurchaseHistoryListWrapper,
  PurchaseHistoryListItemsWrapper,
  PurchaseHistoryList,
  PurchaseHistoryItem,
  PurchaseHistoryItemBanner,
  PurchaseHistorySortAndSearchWrapperOuter,
  PurchaseHistorySortAndSearchWrapperInner,
  SeeMoreButtonWrapper,
  HelpIcon,
  StyledSearchBar
} from "./PurchaseHistory.styled";
import { PurchasedItem } from "../../../types/PurchasedItem";
import TitleBanner from "../../../components/TitleBanner/TitleBanner";
import TooltipComponent from "../../../components/Tooltip/Tooltip";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_CLIENT_URL;

interface FilterFunction {
  (item: PurchasedItem): boolean;
}

const PurchaseHistory: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [visiblePurchases, setVisiblePurchases] = useState<number>(3);
  const purchasedItems = useContext(UserContext)?.purchasedItems || [];

  const formatPurchaseDate = (purchaseDate: Date | string) => {
    const date =
      purchaseDate instanceof Date ? purchaseDate : new Date(purchaseDate);
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
    } as const satisfies Intl.DateTimeFormatOptions;

    return date.toLocaleDateString("en-US", options);
  };

  type AllowedFields = "product_name" | "price" | "product_id";

  const createFilterFunction = (
    field: AllowedFields,
    searchText: string
  ): FilterFunction => {
    return (item: PurchasedItem) => {
      const itemValue = item[field];
      if (typeof itemValue === "number") {
        return itemValue.toString().includes(searchText);
      } else {
        return itemValue.toLowerCase().includes(searchText.toLowerCase());
      }
    };
  };

  const filterOptions: Record<string, FilterFunction> = {
    "": createFilterFunction("product_name", searchText),
    name: createFilterFunction("product_name", searchText),
    price: createFilterFunction("price", searchText),
    productId: createFilterFunction("product_id", searchText),
    purchasedDate: (item) => {
      const purchaseDate = new Date(item.purchase_date);
      const formattedDate = formatPurchaseDate(purchaseDate);
      return (
        formattedDate.toLowerCase().includes(searchText.toLowerCase()) ||
        purchaseDate
          .toLocaleString("default", { month: "long" })
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        purchaseDate.getFullYear().toString().includes(searchText)
      );
    },
  };

  const filteredPurchasedItems = purchasedItems.filter(
    (item) => filterOptions[selectedOption]?.(item) ?? false
  );

  useEffect(() => {
    setVisiblePurchases(3);
  }, [searchText, selectedOption]);

  const handleLoadMore = () => {
    setVisiblePurchases((prev) => prev + 3);
  };

  return (
    <>
      <TitleBanner textContent={"Purchase History"} />
      <PurchaseHistoryPageWrapper>
        <PurchaseHistorySortAndSearchWrapperOuter>
          <PurchaseHistorySortAndSearchWrapperInner>
            <label htmlFor="purchasesSelect">Sort&nbsp;By:</label>
            <select
              id="purchasesSelect"
              onChange={(e) => setSelectedOption(e.target.value)}
              value={selectedOption}
            >
              <option value="" disabled className="select-placeholder">
                Select an option
              </option>
              <option value="name">Product Name</option>
              <option value="productId">Product ID</option>
              <option value="price">Price</option>
              <option value="purchasedDate">Date Purchased</option>
            </select>
            <StyledSearchBar
              onChange={(value) => setSearchText(value)}
            />
          </PurchaseHistorySortAndSearchWrapperInner>
          <HelpIcon>
            <img
              src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/account/help-icon.png"
              alt="Help Icon"
            />
            <TooltipComponent
              left="-12px"
              top="-105px"
              message={
                "Looking for subscription purchase information? Please navigate to the Manage Subscriptions page."
              }
            />
          </HelpIcon>
        </PurchaseHistorySortAndSearchWrapperOuter>

        <PurchaseHistoryListWrapper>
          <PurchaseHistoryList>
            {filteredPurchasedItems
              .slice(0, visiblePurchases)
              .map((item: PurchasedItem) => {
                const formattedDate = formatPurchaseDate(item.purchase_date);
                return (
                  <PurchaseHistoryItem key={item.id}>
                    <PurchaseHistoryItemBanner>
                      <h3>{item.product_type}</h3>
                      <Link
                        to={`${BASE_URL}/${item.product_type}/${item.product_id}`}
                      >
                        View Product
                      </Link>
                    </PurchaseHistoryItemBanner>
                    <PurchaseHistoryListItemsWrapper>
                      <p>
                        <span>Product Name:</span> {item.product_name}
                      </p>
                      <p>
                        <span>Product ID:</span> {item.product_id}
                      </p>

                      <p>
                        <span>Price:</span> ${item.price}
                      </p>

                      <hr />
                      <p>
                        <span>Purchase Date:</span> {formattedDate}
                      </p>
                    </PurchaseHistoryListItemsWrapper>
                  </PurchaseHistoryItem>
                );
              })}
          </PurchaseHistoryList>
        </PurchaseHistoryListWrapper>

        {visiblePurchases < filteredPurchasedItems.length && (
          <SeeMoreButtonWrapper>
            <button onClick={handleLoadMore}>Load More Purchases</button>
          </SeeMoreButtonWrapper>
        )}
      </PurchaseHistoryPageWrapper>
      <div style={{ height: "1px" }}>&nbsp;</div>
    </>
  );
};

export default PurchaseHistory;

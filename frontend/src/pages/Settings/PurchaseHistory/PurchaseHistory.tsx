import React, { useContext, useState } from "react";
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
} from "./PurchaseHistory.styled";
import { PurchasedItem } from "../../../types/PurchasedItem";
import TitleBanner from "../../../components/TitleBanner/TitleBanner";
import SearchBar from "../../../components/SearchBar/SearchBar";
import TooltipComponent from "../../../components/Tooltip/Tooltip";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_CLIENT_URL;

const PurchaseHistory: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
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

  console.log(purchasedItems);

  const filterPurchasedItems = (
    searchText: string,
    selectedOption: string,
    purchasedItems: PurchasedItem[]
  ) => {
    return purchasedItems.filter((item: PurchasedItem) => {
      switch (selectedOption) {
        case "":
          return item.product_name
            .toLowerCase()
            .includes(searchText.toLowerCase());
        case "name":
          return item.product_name
            .toLowerCase()
            .includes(searchText.toLowerCase());
        case "price":
          return item.price.toString().includes(searchText);
        case "productId":
          return item.product_id.toString().includes(searchText);
        case "purchasedDate": {
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
        }
        default:
          return false;
      }
    });
  };

  const filteredPurchasedItems = filterPurchasedItems(
    searchText,
    selectedOption,
    purchasedItems
  );

  return (
    <>
      <TitleBanner textContent={"Purchase History"} />
      <PurchaseHistoryPageWrapper>
        <PurchaseHistorySortAndSearchWrapperOuter>
          <PurchaseHistorySortAndSearchWrapperInner>
            <label htmlFor="purchasesSelect">Sort By:</label>
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
            <SearchBar
              paddingLeft="12px"
              onChange={(value) => setSearchText(value)}
            />
          </PurchaseHistorySortAndSearchWrapperInner>
          <div className="help-icon">
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
          </div>
        </PurchaseHistorySortAndSearchWrapperOuter>

        <PurchaseHistoryListWrapper>
          <PurchaseHistoryList>
            {filteredPurchasedItems.map((item: PurchasedItem) => {
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
      </PurchaseHistoryPageWrapper>
    </>
  );
};

export default PurchaseHistory;

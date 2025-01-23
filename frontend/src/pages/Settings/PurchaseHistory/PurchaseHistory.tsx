import React, { useContext } from "react";
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

const PurchaseHistory: React.FC = () => {
  const purchasedItems = useContext(UserContext)?.purchasedItems || [];

  return (
    <>
      <TitleBanner textContent={"Purchase History"} />
      <PurchaseHistoryPageWrapper>
        <PurchaseHistorySortAndSearchWrapperOuter>
          <PurchaseHistorySortAndSearchWrapperInner>
            <label htmlFor="purchasesSelect">Sort By:</label>
            <select id="purchasesSelect">
              <option value="">Select an option</option>
              <option value="name">Name</option>
              <option value="purchaseType">Purchase Type</option>
              <option value="price">Price</option>
            </select>
            <SearchBar paddingLeft="12px" />
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
            {purchasedItems.map((item: PurchasedItem) => {
              const purchaseDate = new Date(item.purchase_date);
              const options = {
                month: "long",
                day: "numeric",
                year: "numeric",
              } as const satisfies Intl.DateTimeFormatOptions;
              const formattedDate = purchaseDate.toLocaleDateString(
                "en-US",
                options
              );

              return (
                <PurchaseHistoryItem key={item.id}>
                  <PurchaseHistoryItemBanner>
                    <h3>{item.product_type}</h3>
                    <p>
                      <span>ID:</span> {item.product_id}
                    </p>
                  </PurchaseHistoryItemBanner>
                  <PurchaseHistoryListItemsWrapper>
                    <p>
                      <span>Product Name:</span> {item.product_name}
                    </p>
                    <p>
                      <span>Purchase Type:</span> {item.purchase_type}
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

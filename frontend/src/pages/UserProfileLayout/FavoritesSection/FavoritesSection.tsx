// FavoritesSection.tsx
import React, { useState, useEffect } from "react";
import { Tutorial } from "../../../types/Tutorial/Tutorial";
import { Blog } from "../../../types/Blog/Blog";
import { PurchasedTutorial } from "../../../types/PurchasedItem";
import {
  FavoritesSectionContainer,
  FavoritesItemWrapper,
  FavoriteIconWrapper,
  FavoriteTitle,
  ViewLink,
} from "./FavoritesSection.styled";
import TutorialIcon from "../../assets/images/tutorial-icon.png";
import BlogIcon from "../../assets/images/blog-icon.png";

interface FavoritesSectionProps {
  items: Tutorial[] | Blog[];
  purchasedItems: PurchasedTutorial[];
  filterType: "all" | "free" | "premium" | "purchased";
  contentType: "tutorials" | "blogs";
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  items,
  purchasedItems,
  filterType,
  contentType,
}) => {
  const [filteredItems, setFilteredItems] = useState<
    (Tutorial | Blog | PurchasedTutorial)[]
  >([]);

  useEffect(() => {
    let displayedItems: (Tutorial | Blog | PurchasedTutorial)[] = items;

    if (filterType === "free") {
      displayedItems = displayedItems.filter(
        (item) => "isPremium" in item && item.isPremium === false
      );
    } else if (filterType === "premium") {
      displayedItems = displayedItems.filter(
        (item) => "isPremium" in item && item.isPremium === true
      );
    } else if (filterType === "purchased" && contentType === "tutorials") {
      displayedItems = purchasedItems;
    }

    setFilteredItems(displayedItems);
  }, [filterType, contentType, items, purchasedItems]);

  return (
    <FavoritesSectionContainer>
      {filteredItems.map((item) => {
        if ("isPremium" in item) {
          // Item is either a Tutorial or Blog (has `isPremium`, `id`, and `title` attributes)
          return (
            <FavoritesItemWrapper key={item.id}>
              <FavoriteIconWrapper>
                <img
                  src={contentType === "tutorials" ? TutorialIcon : BlogIcon}
                  alt={item.title}
                />
              </FavoriteIconWrapper>
              <FavoriteTitle>{item.title}</FavoriteTitle>
              <ViewLink to={`/${contentType}/${item.id}`}>View</ViewLink>
            </FavoritesItemWrapper>
          );
        } else if ("product_id" in item) {
          // Item is a PurchasedTutorial (has `product_id`, `product_name`, and `product_type` attributes)
          return (
            <FavoritesItemWrapper key={item.product_id}>
              <FavoriteIconWrapper>
                <img src={TutorialIcon} alt={item.product_name} />
              </FavoriteIconWrapper>
              <FavoriteTitle>{item.product_name}</FavoriteTitle>
              <ViewLink to={`/tutorial/${item.product_id}`}>View</ViewLink>
            </FavoritesItemWrapper>
          );
        } else {
          return null;
        }
      })}
    </FavoritesSectionContainer>
  );
};

export default FavoritesSection;

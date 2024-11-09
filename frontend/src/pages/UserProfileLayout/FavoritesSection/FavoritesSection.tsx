import React, { useState } from "react";
import {
  FavouriteIcon,
  FavWrapper,
  FavoritesDropdownWrapper,
  ViewAllButton,
  FavouritesContent,
} from "./FavoritesSection.styled"; // Import necessary styled components
import TutorialIcon from "../../../assets/images/tutorial-icon.png";
import BlogIcon from "../../../assets/images/blog-icon.png";
import { Tutorial } from "../../../types/Tutorial/Tutorial";
import { Blog } from "../../../types/Blog/Blog";
import { PurchasedItem } from "../../../types/PurchasedItem";

interface FavoritesSectionProps {
  favouriteTutorials: Tutorial[];
  favouriteBlogs: Blog[];
  purchasedItems: PurchasedItem[];
  isOwnProfile: boolean;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  favouriteTutorials,
  favouriteBlogs,
  purchasedItems,
  isOwnProfile,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("0");

  // Pre-filtered arrays for easy access based on selected filter
  const premiumBlogs = favouriteBlogs?.filter((blog) => blog.isPremium);
  const freeBlogs = favouriteBlogs?.filter((blog) => !blog.isPremium);
  const premiumTutorials = favouriteTutorials?.filter(
    (tutorial) => tutorial.isPremium
  );
  const freeTutorials = favouriteTutorials?.filter(
    (tutorial) => !tutorial.isPremium
  );

  // Handler for tracking selected filter
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  // Determine which items to display based on selectedFilter
  const getFilteredItems = () => {
    switch (selectedFilter) {
      case "1": // Free
        return { tutorials: freeTutorials, blogs: freeBlogs };
      case "2": // Premium
        return { tutorials: premiumTutorials, blogs: premiumBlogs };
      case "3": // Purchased
        return {
          tutorials: purchasedItems?.filter(
            (item) => item.product_type === "tutorial"
          ),
          blogs: purchasedItems?.filter((item) => item.product_type === "blog"),
        };
      default: // All (both free and premium, excluding purchased)
        return { tutorials: favouriteTutorials, blogs: favouriteBlogs };
    }
  };

  const filteredItems = getFilteredItems();

  return (
    <>
      <FavoritesDropdownWrapper>
        {isOwnProfile && (
          <select value={selectedFilter} onChange={handleFilterChange}>
            <option value="0">All</option>
            <option value="1">Free</option>
            <option value="2">Premium</option>
            <option value="3">Purchased</option>
          </select>
        )}
      </FavoritesDropdownWrapper>

      <FavouritesContent>
        <FavWrapper>
          <FavouriteIcon>
            <img src={TutorialIcon} alt="Tutorials" />
          </FavouriteIcon>
          <p>Tutorials</p>
          <ViewAllButton onClick={() => console.log(filteredItems.tutorials)}>
            View
          </ViewAllButton>
        </FavWrapper>

        <FavWrapper>
          <FavouriteIcon>
            <img src={BlogIcon} alt="Blogs" />
          </FavouriteIcon>
          <p>Blogs</p>
          <ViewAllButton onClick={() => console.log(filteredItems.blogs)}>
            View
          </ViewAllButton>
        </FavWrapper>
      </FavouritesContent>
    </>
  );
};

export default FavoritesSection;

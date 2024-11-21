import { useContext, useEffect, useState } from "react";

import {
  FavouriteIcon,
  FavWrapper,
  FavoritesDropdownWrapper,
  ViewAllButton,
  FavouritesContent,
  FavoritesWrapper,
  FilteredItemWrapper,
  BackButton,
  ViewHeader,
  EmptyMessage,
  TopButtonsWrapper,
} from "./FavoritesSection.styled";
import TutorialIcon from "../../../assets/images/tutorial-icon.png";
import BlogIcon from "../../../assets/images/blog-icon.png";
import { Tutorial } from "../../../types/Tutorial/Tutorial";
import { Blog } from "../../../types/Blog/Blog";
import { PurchasedItem } from "../../../types/PurchasedItem";
import BackIcon from "../../../assets/images/back-icon.png";
import { UserContext } from "../../../context/UserContext";
import { getPublicUserFavourites } from "../../../services/favouritesService";

const BASE_URL = "http://localhost:5173";

interface FavoritesSectionProps {
  isOwnProfile: boolean;
  publicUserId?: number;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  isOwnProfile,
  publicUserId,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("0");
  const [viewMode, setViewMode] = useState<"default" | "view">("default");
  const [currentView, setCurrentView] = useState<"tutorials" | "blogs" | null>(
    null
  );
  const [publicFavourites, setPublicFavourites] = useState<{
    tutorials: Tutorial[];
    blogs: Blog[];
  }>({ tutorials: [], blogs: [] });

  const {
    favouriteTutorials = [],
    favouriteBlogs = [],
    purchasedItems = [],
  } = useContext(UserContext) || {};

  useEffect(() => {
    if (!isOwnProfile && publicUserId) {
      const fetchPublicFavourites = async () => {
        try {
          const favourites = await getPublicUserFavourites(publicUserId);
          setPublicFavourites(favourites);
        } catch (error) {
          console.error("Error fetching public user favourites:", error);
        }
      };
      fetchPublicFavourites();
    }
  }, [isOwnProfile, publicUserId]);

  const premiumBlogs = isOwnProfile
    ? favouriteBlogs.filter((blog) => blog.isPremium)
    : publicFavourites.blogs.filter((blog) => blog.isPremium);

  const freeBlogs = isOwnProfile
    ? favouriteBlogs.filter((blog) => !blog.isPremium)
    : publicFavourites.blogs.filter((blog) => !blog.isPremium);

  const premiumTutorials = isOwnProfile
    ? favouriteTutorials.filter((tutorial) => tutorial.isPremium)
    : publicFavourites.tutorials.filter((tutorial) => tutorial.isPremium);

  const freeTutorials = isOwnProfile
    ? favouriteTutorials.filter((tutorial) => !tutorial.isPremium)
    : publicFavourites.tutorials.filter((tutorial) => !tutorial.isPremium);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const getFilteredItems = () => {
    switch (selectedFilter) {
      case "1":
        return { tutorials: freeTutorials, blogs: freeBlogs };
      case "2":
        return { tutorials: premiumTutorials, blogs: premiumBlogs };
      case "3":
        return isOwnProfile
          ? {
              tutorials: purchasedItems.filter(
                (item) => item.product_type === "tutorial"
              ),
              blogs: purchasedItems.filter(
                (item) => item.product_type === "blog"
              ),
            }
          : { tutorials: [], blogs: [] };
      default:
        return isOwnProfile
          ? { tutorials: favouriteTutorials, blogs: favouriteBlogs }
          : {
              tutorials: publicFavourites.tutorials,
              blogs: publicFavourites.blogs,
            };
    }
  };
  const getFilterLabel = () => {
    switch (selectedFilter) {
      case "1":
        return "Free";
      case "2":
        return "Premium";
      case "3":
        return "Purchased";
      default:
        return "";
    }
  };

  const filteredItems = getFilteredItems();
  const filterLabel = getFilterLabel();
  const viewTypeLabel = currentView === "tutorials" ? "Tutorials" : "Blogs";

  const handleViewClick = (type: "tutorials" | "blogs") => {
    setCurrentView(type);
    setViewMode("view");
  };

  const handleBackClick = () => {
    setViewMode("default");
    setCurrentView(null);
  };

  const isTutorial = (
    item: Tutorial | Blog | PurchasedItem
  ): item is Tutorial => {
    return (
      (item as Tutorial).id !== undefined &&
      (item as Tutorial).title !== undefined
    );
  };

  const isBlog = (item: Blog | Tutorial | PurchasedItem): item is Blog => {
    return (
      (item as Blog).id !== undefined && (item as Blog).title !== undefined
    );
  };

  const isPurchasedItem = (
    item: Tutorial | Blog | PurchasedItem
  ): item is PurchasedItem => {
    return (
      (item as PurchasedItem).product_id !== undefined &&
      (item as PurchasedItem).product_name !== undefined
    );
  };

  return (
    <FavoritesWrapper>
      {viewMode === "default" ? (
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
              <ViewAllButton onClick={() => handleViewClick("tutorials")}>
                View
              </ViewAllButton>
            </FavWrapper>

            <FavWrapper>
              <FavouriteIcon>
                <img src={BlogIcon} alt="Blogs" />
              </FavouriteIcon>
              <p>Blogs</p>
              <ViewAllButton onClick={() => handleViewClick("blogs")}>
                View
              </ViewAllButton>
            </FavWrapper>
          </FavouritesContent>
        </>
      ) : (
        <>
          <TopButtonsWrapper>
            <BackButton onClick={handleBackClick}>
              <img src={BackIcon} alt="" />
              <span>Back</span>
            </BackButton>
            <ViewHeader>
              {filterLabel} {viewTypeLabel}
            </ViewHeader>
          </TopButtonsWrapper>

          <FilteredItemWrapper>
            {currentView === "tutorials" &&
              filteredItems.tutorials?.length === 0 && (
                <EmptyMessage>No {filterLabel} Tutorials</EmptyMessage>
              )}
            {currentView === "blogs" && filteredItems.blogs?.length === 0 && (
              <EmptyMessage>No {filterLabel} Blogs</EmptyMessage>
            )}
            {currentView === "tutorials" &&
              filteredItems.tutorials?.map((item) => (
                <div key={isTutorial(item) ? item.id : item.product_id}>
                  <a
                    href={`${BASE_URL}/tutorial/${
                      isTutorial(item) ? item.id : item.product_id
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {isTutorial(item)
                      ? item.title
                      : isPurchasedItem(item)
                      ? item.product_name
                      : "Unknown Title"}
                  </a>
                </div>
              ))}
            {currentView === "blogs" &&
              filteredItems.blogs?.map((item) => (
                <div key={isBlog(item) ? item.id : item.product_id}>
                  <a
                    href={`${BASE_URL}/blog/${
                      isBlog(item) ? item.id : item.product_id
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {isBlog(item)
                      ? item.title
                      : isPurchasedItem(item)
                      ? item.product_name
                      : "Unknown Title"}
                  </a>
                </div>
              ))}
          </FilteredItemWrapper>
        </>
      )}
    </FavoritesWrapper>
  );
};

export default FavoritesSection;

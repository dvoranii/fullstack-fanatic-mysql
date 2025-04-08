import { Helmet } from "react-helmet-async";
import { useContext, useState, useEffect, useMemo } from "react";
import Pagination from "../../components/Pagination/Pagination";
import {
  TutorialList,
  TutorialItemWrapper,
  ThumbnailBannerWrapper,
  TutorialThumbnail,
  StarIcon,
  PremiumBanner,
  PremiumThumbnailWrapperOuter,
  FlipIconWrapper,
  CardFace,
  CardInner,
  DifficultyStarsWrapper,
  BottomIconsWrapper,
  TutorialListOuter,
  StyledSearchBar,
  FreeIconWrapper
} from "./TutorialsPage.styled";

import { CartItem } from "../../types/CartItem";

import Title from "../../components/Title/Title";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";

import { tutorialContent } from "../../assets/tutorialContent";
import { UserContext } from "../../context/UserContext";
import { mapTutorialToCartItem } from "../../utils/cartUtils";

import {filterTags} from "../../assets/filterTags";
import { FilterTag } from "../../types/FilterTag";
import { TagFilterDropdown } from "../../components/TagFilterDropdown/TagFilterDropdown";

const TutorialsPage: React.FC = () => {
  const {
    profile,
    favouriteTutorials = [],
    toggleFavourite = () => {},
    cartItems = [],
    addItemToCart = () => {},
    purchasedItems,
  } = useContext(UserContext) || {};
  
  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<"AND" | "OR">("OR");

  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const tutorialsPerPage = 8;

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tutorialContent.forEach(tutorial => {
      tutorial.tags.forEach(tagId => {
        counts[tagId] = (counts[tagId] || 0) +1;
      })
    })
    return counts;
  }, []);

  const availableTags = useMemo(() => {
    const allTagIds = Array.from(new Set(tutorialContent.flatMap(t => t.tags)));
    return allTagIds.map(tagId => filterTags[tagId]).filter((tag): tag is FilterTag => !!tag);
  },[]);

  const filteredTutorials = useMemo(() => {
    return tutorialContent.filter(tutorial => {
      const searchMatch = 
        tutorial.title.toLowerCase().includes(searchText.toLowerCase()) || 
        tutorial.description.toLowerCase().includes(searchText.toLowerCase());

      const tagMatch = selectedTags.length === 0 || 
        (filterMode === "AND" 
          ? selectedTags.every(tag => tutorial.tags.includes(tag)) 
          : selectedTags.some(tag => tutorial.tags.includes(tag)));


      return searchMatch && tagMatch;
    })
  }, [searchText, selectedTags, filterMode]);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId])
  }


  const totalTutorials = filteredTutorials.length;
  const totalPages = Math.ceil(totalTutorials / tutorialsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, totalPages]);

  const handleClearAllTags = () => {
    setSelectedTags([]); 
  };

  const isTutorialPurchased = (tutorialId: number) => {
    return purchasedItems?.some(
      (item) =>
        item.product_id === tutorialId && item.product_type === "tutorial"
    );
  };
  const startIdx = (currentPage - 1) * tutorialsPerPage;
  const endIdx = startIdx + tutorialsPerPage;

  const handleFlip = (id: string) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderStars = (difficulty: string) => {
    let starImg: string;
    let starCount: number;
    let titleText: string | undefined;

    switch (difficulty) {
      case "beginner":
        starImg =
          "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/tutorials/1-beginner-star.png";
        starCount = 1;
        titleText = "Beginner";
        break;
      case "intermediate":
        starImg =
          "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/tutorials/2-intermediate-stars.png";
        starCount = 2;
        titleText = "Intermediate";
        break;
      case "advanced":
        starImg =
          "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/tutorials/3-advanced-stars.png";
        starCount = 3;
        titleText = "Advanced";
        break;
      default:
        starImg =
          "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/tutorials/1-beginner-star.png";
        starCount = 1;
    }

    return Array(starCount)
      .fill(null)
      .map((_, index) => (
        <StarIcon
          key={index}
          src={starImg}
          alt={`${difficulty} stars`}
          title={titleText}
        />
      ));
  };

  const isItemInCart = (id: number) => {
    return cartItems.some((item) => item.id === id);
  };

  const canAccessTutorial = (
    userLevel: string | undefined,
    tutorialLevel: string | undefined
  ) => {
    const levels = ["starter", "casual pro", "premium"];
    const userIndex = levels.indexOf(userLevel || "");
    const tutorialIndex = levels.indexOf(tutorialLevel || "");

    return userIndex >= tutorialIndex;
  };

  const handleRestrictedAccessClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };


  return (
    <>
      <Helmet>
        <title>Tutorials - Full Stack Fanatic</title>
        <meta name="description" content="Full Stack Fanatic tutorials page." />
        <link
          rel="preload"
          href="/assets/images/bg-images/SquaresAndTriangles.svg"
          as="image"
          type="image/svg+xml"
        />
      </Helmet>
      <Title textContent="Tutorials" pseudoRight="-3px" pseudoWidth="120px" />

      <TutorialListOuter>
        <StyledSearchBar
          onChange={(value) => setSearchText(value)}
        />
          <TagFilterDropdown
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearAll={handleClearAllTags}
            filterMode={filterMode}
            onFilterModeChange={setFilterMode}
            tagCounts={tagCounts}
            className={"tutorial-filter-dropdown"}
        />
        <img
          src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/bg-images/SquaresAndTriangles.svg"
          alt="Squares and Triangles"
          className="bg-squares-and-triangles"
          width="181"
          height="106"
          loading="lazy"
        />

        <div className="block-1" />
        <div className="block-2" />
        <img
          src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/bg-images/swirly-line-bg.svg"
          className="swirly-1"
          alt="swirly line"
          loading="lazy"
          width="240"
          height="160"
        />
        <TutorialList>
          {filteredTutorials.slice(startIdx, endIdx).map((tutorial) => {
            const alreadyInCart = isItemInCart(tutorial.id);
            const isPurchased = isTutorialPurchased(tutorial.id);

            const hasAccess =
              isPurchased ||
              canAccessTutorial(profile?.premiumLevel, tutorial.premiumLevel);

            const cartItem: CartItem = mapTutorialToCartItem(tutorial);
            
            return (
              <TutorialItemWrapper key={tutorial.id}>
                <CardInner className={flipped[tutorial.id] ? "is-flipped" : ""}>
                  <CardFace>
                    {tutorial.isPremium && !hasAccess ? (
                      <PremiumThumbnailWrapperOuter>
                        <ThumbnailBannerWrapper>
                          <DifficultyStarsWrapper>
                            {renderStars(tutorial.difficulty)}
                          </DifficultyStarsWrapper>

                          {profile && (
                            <FavouriteButton
                              isFavourited={favouriteTutorials.some(
                                (favTutorial) => favTutorial.id === tutorial.id
                              )}
                              onClick={() =>
                                toggleFavourite(tutorial.id, "tutorial")
                              }
                              altText="Tutorial Favourite Button"
                              isDisabled={tutorial.isPremium}
                            />
                          )}
                        </ThumbnailBannerWrapper>
                        <TutorialThumbnail
                          to={`/tutorial/${tutorial.id}`}
                          onClick={(e) => {
                            if (!hasAccess) {
                              handleRestrictedAccessClick(e);
                            }
                          }}
                        >
                          <h2 title={tutorial.title}>{tutorial.title}</h2>
                          <img src={tutorial.image} alt={tutorial.title} />

                         
                          <PremiumBanner>
                            <p>Premium</p>
                            <img
                              src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/misc/lock.png"
                              alt="Lock"
                            />
                          </PremiumBanner>
                        </TutorialThumbnail>
                      </PremiumThumbnailWrapperOuter>
                    ) : (
                      <div>
                        <ThumbnailBannerWrapper>
                          <DifficultyStarsWrapper>
                            {renderStars(tutorial.difficulty)}
                          </DifficultyStarsWrapper>

                          {profile && (
                            <FavouriteButton
                              isFavourited={favouriteTutorials.some(
                                (favTutorial) => favTutorial.id === tutorial.id
                              )}
                              onClick={() =>
                                toggleFavourite(tutorial.id, "tutorial")
                              }
                              altText="Tutorial Favourite Button"
                            />
                          )}
                        </ThumbnailBannerWrapper>
                        <TutorialThumbnail to={`/tutorial/${tutorial.id}`}>
                          <h2 title={tutorial.title}>{tutorial.title}</h2>
                          <img src={tutorial.image} alt={tutorial.title} />
                        </TutorialThumbnail>
                      </div>
                    )}
                    <BottomIconsWrapper>
                      {tutorial.availableForPurchase &&
                        profile &&
                        !isPurchased && (
                          <AddToCartButton
                            item={cartItem}
                            alreadyInCart={alreadyInCart}
                            isAccessible={hasAccess && tutorial.isPremium}
                            onAddToCart={addItemToCart}
                            margin="10px"
                          />
                        )}

                      <FlipIconWrapper
                        onClick={() => handleFlip(String(tutorial.id))}
                      >
                        <img
                          src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/tutorials/flip-icon.png"
                          alt="Flip"
                          title="Read more"
                        />
                      </FlipIconWrapper>

                        
                      {tutorial.accessLevel === "free" ? <FreeIconWrapper><img src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/tutorials/free.png"/></FreeIconWrapper> : ""}
                    </BottomIconsWrapper>
                  </CardFace>
                  <CardFace back>
                    <div>
                      <h3>{tutorial.title}</h3>
                      <p>{tutorial.description}</p>

                      <FlipIconWrapper
                        onClick={() => handleFlip(String(tutorial.id))}
                      >
                        <img
                          src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/tutorials/flip-icon-backside.png"
                          alt="Flip"
                          title="View thumbnail"
                        />
                      </FlipIconWrapper>
                    </div>
                  </CardFace>
                </CardInner>
              </TutorialItemWrapper>
            );
          })}
        </TutorialList>
      </TutorialListOuter>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <div style={{ height: "1px" }}>&nbsp;</div>
    </>
  );
};

export default TutorialsPage;

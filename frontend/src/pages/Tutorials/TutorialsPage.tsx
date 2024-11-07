import { useContext, useState, useEffect } from "react";
import Title from "../../components/Title/Title";
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
  AddToCartWrapper,
  TutorialListOuter,
} from "./TutorialsPage.styled";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import BeginnerStarImg from "../../assets/images/tutorials/1-beginner-star.png";
import IntermediateStarImg from "../../assets/images/tutorials/2-intermediate-stars.png";
import AdvancedStarImg from "../../assets/images/tutorials/3-advanced-stars.png";
import { UserContext } from "../../context/UserContext";
import { tutorialContent } from "../../assets/tutorialContent";
import PremiumLockImg from "../../assets/images/lock.png";
import FlipIconFront from "../../assets/images/tutorials/flip-icon.png";
import FlipIconBack from "../../assets/images/tutorials/flip-icon-backside.png";
import AddToCardImg from "../../assets/images/add-to-cart-icon.png";
import { TutorialContentItem } from "../../types/Tutorial/Tutorial";
import SearchBar from "../../components/SearchBar/SearchBar";
import SquaresAndTriangles from "../../assets/images/SquaresAndTriangles.svg";
import SwirlyLineImg from "../../assets/images/swirly-line-bg.svg";
import { fetchPurchasedTutorials } from "../../services/purchasesService";
import { PurchasedTutorial } from "../../types/PurchasedItem";

const TutorialsPage: React.FC = () => {
  const {
    profile,
    favouriteTutorials = [],
    toggleFavourite = () => {},
    cartItems = [],
    addItemToCart = () => {},
    loading,
  } = useContext(UserContext) || {};
  const [searchText, setSearchText] = useState("");
  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const tutorialsPerPage = 8;
  const filteredTutorials = tutorialContent.filter((tutorial) =>
    tutorial.title.toLowerCase().includes(searchText.toLowerCase())
  );
  const totalTutorials = filteredTutorials.length;
  const totalPages = Math.ceil(totalTutorials / tutorialsPerPage);
  const [purchasedTutorials, setPurchasedTutorials] = useState<
    PurchasedTutorial[]
  >([]);
  const [purchasesLoading, setPurchasesLoading] = useState(true);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [searchText, totalPages]);

  useEffect(() => {
    const getPurchases = async () => {
      if (profile?.id) {
        try {
          const purchases = await fetchPurchasedTutorials(profile.id);
          setPurchasedTutorials(purchases);
        } catch (error) {
          console.error("Error fetching purchases:", error);
        } finally {
          setPurchasesLoading(false);
        }
      } else {
        setPurchasesLoading(false);
      }
    };

    getPurchases();
  }, [profile?.id]);

  const isTutorialPurchased = (title: string) => {
    return purchasedTutorials.some(
      (tutorial) => tutorial.product_name === title
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
        starImg = BeginnerStarImg;
        starCount = 1;
        titleText = "Beginner";
        break;
      case "intermediate":
        starImg = IntermediateStarImg;
        starCount = 2;
        titleText = "Intermediate";
        break;
      case "advanced":
        starImg = AdvancedStarImg;
        starCount = 3;
        titleText = "Advanced";
        break;
      default:
        starImg = BeginnerStarImg;
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

  const handleAddToCart = (tutorial: TutorialContentItem) => {
    const cartItem = {
      id: tutorial.id,
      title: tutorial.title,
      created_at: tutorial.created_at,
      image: tutorial.image,
      isPremium: tutorial.isPremium,
      description: tutorial.description,
      availableForPurchase: tutorial.availableForPurchase,
      accessLevel: tutorial.accessLevel,
      price: tutorial.price || 0,
      type: "tutorial" as const,
    };
    addItemToCart(cartItem);
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

  if (loading || purchasesLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Title textContent="Tutorials" pseudoRight="-3px" pseudoWidth="120px" />

      <TutorialListOuter>
        <SearchBar
          width="46%"
          paddingLeft="60px"
          onChange={(value) => setSearchText(value)}
        />
        <img
          src={SquaresAndTriangles}
          alt="Squares and Triangles"
          className="bg-squares-and-triangles"
        />

        <div className="block-1" />
        <div className="block-2" />
        <img src={SwirlyLineImg} className="swirly-1" alt="" />
        <TutorialList>
          {filteredTutorials.slice(startIdx, endIdx).map((tutorial) => {
            const alreadyInCart = isItemInCart(tutorial.id);
            const isPurchased = isTutorialPurchased(tutorial.title);

            const hasAccess =
              isPurchased ||
              canAccessTutorial(profile?.premiumLevel, tutorial.premiumLevel);

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
                            <img src={PremiumLockImg} alt="Lock" />
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
                          <AddToCartWrapper>
                            <button
                              onClick={() => handleAddToCart(tutorial)}
                              disabled={alreadyInCart}
                              style={{
                                opacity: alreadyInCart ? 0.5 : 1,
                                cursor: alreadyInCart
                                  ? "not-allowed"
                                  : "pointer",
                              }}
                            >
                              <img
                                src={AddToCardImg}
                                alt="Add to cart"
                                title={
                                  alreadyInCart
                                    ? "Added to Cart"
                                    : "Add to Cart"
                                }
                              />
                            </button>
                          </AddToCartWrapper>
                        )}
                      <FlipIconWrapper
                        onClick={() => handleFlip(String(tutorial.id))}
                      >
                        <img src={FlipIconFront} alt="Flip" title="Read more" />
                      </FlipIconWrapper>
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
                          src={FlipIconBack}
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
    </>
  );
};

export default TutorialsPage;

import { Helmet } from "react-helmet-async";
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
import SearchBar from "../../components/SearchBar/SearchBar";
import SquaresAndTriangles from "../../assets/images/SquaresAndTriangles.svg";
import SwirlyLineImg from "../../assets/images/swirly-line-bg.svg";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import { CartItem } from "../../types/CartItem";
import { mapTutorialToCartItem } from "../../utils/cartUtils";

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
  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const tutorialsPerPage = 8;
  const filteredTutorials = tutorialContent.filter((tutorial) =>
    tutorial.title.toLowerCase().includes(searchText.toLowerCase())
  );
  const totalTutorials = filteredTutorials.length;
  const totalPages = Math.ceil(totalTutorials / tutorialsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [searchText, totalPages]);

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
          href={SquaresAndTriangles}
          as="image"
          type="image/svg+xml"
        />
      </Helmet>
      <Title textContent="Tutorials" pseudoRight="-3px" pseudoWidth="120px" />

      <TutorialListOuter>
        <SearchBar
          paddingLeft="60px"
          onChange={(value) => setSearchText(value)}
        />
        <img
          src={SquaresAndTriangles}
          alt="Squares and Triangles"
          className="bg-squares-and-triangles"
          width="181"
          height="106"
          loading="lazy"
        />

        <div className="block-1" />
        <div className="block-2" />
        <img src={SwirlyLineImg} className="swirly-1" alt="" />
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

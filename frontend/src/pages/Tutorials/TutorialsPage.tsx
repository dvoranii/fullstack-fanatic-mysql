import { useContext, useState } from "react";
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
} from "./TutorialsPage.styled";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import BeginnerStarImg from "../../assets/images/tutorials/1-beginner-star.png";
import IntermediateStarImg from "../../assets/images/tutorials/2-intermediate-stars.png";
import AdvancedStarImg from "../../assets/images/tutorials/3-advanced-stars.png";
import { UserContext } from "../../context/UserContext";
import { tutorialContent } from "../../assets/tutorialContent";
import PremiumLockImg from "../../assets/images/tutorials/lock.png";
import FlipIconFront from "../../assets/images/tutorials/flip-icon.png";
import FlipIconBack from "../../assets/images/tutorials/flip-icon-backside.png";
import AddToCardImg from "../../assets/images/add-to-cart-icon.png";
import { TutorialContentItem } from "../../types/Tutorial/Tutorial";

const TutorialsPage: React.FC = () => {
  const {
    profile,
    favouriteTutorials = [],
    toggleFavourite = () => {},
    addItemToCart = () => {},
    loading,
  } = useContext(UserContext) || {};

  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedTutorials, setLoadedTutorials] = useState<number>(8);
  const tutorialsPerPage = 8;

  const totalTutorials = tutorialContent.length;
  const totalPages = Math.ceil(totalTutorials / tutorialsPerPage);

  const handleLoadMore = () => {
    setLoadedTutorials((prev) => prev + tutorialsPerPage);
  };

  const startIdx = (currentPage - 1) * tutorialsPerPage;
  const endIdx = Math.min(startIdx + tutorialsPerPage, loadedTutorials);

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

  const handleAddToCart = (tutorial: TutorialContentItem) => {
    const cartItem = {
      id: tutorial.id,
      title: tutorial.title,
      created_at: tutorial.created_at,
      image: tutorial.image,
      isPremium: tutorial.isPremium,
      availableForPurchase: tutorial.availableForPurchase,
      accessLevel: tutorial.accessLevel,
      price: tutorial.price || 0,
      type: "tutorial" as const,
    };
    addItemToCart(cartItem);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Title textContent="Tutorials" pseudoRight="-3px" pseudoWidth="120px" />
      <TutorialList>
        {tutorialContent.slice(startIdx, endIdx).map((tutorial) => (
          <TutorialItemWrapper key={tutorial.id}>
            <CardInner className={flipped[tutorial.id] ? "is-flipped" : ""}>
              <CardFace>
                {tutorial.isPremium ? (
                  <PremiumThumbnailWrapperOuter>
                    <ThumbnailBannerWrapper>
                      <DifficultyStarsWrapper>
                        {" "}
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
                    <TutorialThumbnail to={`/tutorial/${tutorial.id}`}>
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
                  {tutorial.availableForPurchase && (
                    <AddToCartWrapper>
                      <button onClick={() => handleAddToCart(tutorial)}>
                        <img src={AddToCardImg} alt="Add to cart" />
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
                  <p>{tutorial.backContent}</p>

                  <FlipIconWrapper
                    onClick={() => handleFlip(String(tutorial.id))}
                  >
                    <img src={FlipIconBack} alt="Flip" title="View thumbnail" />
                  </FlipIconWrapper>
                </div>
              </CardFace>
            </CardInner>
          </TutorialItemWrapper>
        ))}
      </TutorialList>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        onLoadMore={handleLoadMore}
      />
    </>
  );
};

export default TutorialsPage;

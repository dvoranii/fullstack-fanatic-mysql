import { useContext, useState } from "react";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../PageWrapper.styled";
import {
  TutorialList,
  TutorialItemWrapper,
  ThumbnailBannerWrapper,
  TutorialThumbnail,
  BeginnerStarIcon,
  PremiumBanner,
  PremiumThumbnailWrapperOuter,
  FlipIconWrapper,
  CardFace,
  CardInner,
} from "./TutorialsPage.styled";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import BeginnerStarImg from "../../assets/images/1-green-star.png";
import { UserContext } from "../../context/UserContext";
import { tutorialContent } from "../../assets/tutorialContent";
import PremiumLockImg from "../../assets/images/tutorials/lock.png";
import FlipIconFront from "../../assets/images/tutorials/flip-icon.png";
import FlipIconBack from "../../assets/images/tutorials/flip-icon-backside.png";

const TutorialsPage: React.FC = () => {
  const {
    profile,
    favouriteTutorials = [],
    toggleFavourite = () => {},
    loading,
  } = useContext(UserContext) || {};

  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});

  const handleFlip = (id: string) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <PageWrapper>
      <Title textContent="Tutorials" />
      <TutorialList>
        {tutorialContent.map((tutorial) => (
          <TutorialItemWrapper key={tutorial.id}>
            <CardInner className={flipped[tutorial.id] ? "is-flipped" : ""}>
              <CardFace>
                {tutorial.isPremium ? (
                  <PremiumThumbnailWrapperOuter>
                    <ThumbnailBannerWrapper>
                      <BeginnerStarIcon src={BeginnerStarImg} />

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
                      <h2 title={tutorial.title}>PREMIUM: {tutorial.title}</h2>
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
                      <BeginnerStarIcon src={BeginnerStarImg} />
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
                <FlipIconWrapper
                  onClick={() => handleFlip(String(tutorial.id))}
                >
                  <img src={FlipIconFront} alt="Flip" />
                </FlipIconWrapper>
              </CardFace>
              <CardFace back>
                <div>
                  <h3>{tutorial.title}</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    id erat a magna lobortis dictum.
                  </p>
                  <FlipIconWrapper
                    onClick={() => handleFlip(String(tutorial.id))}
                  >
                    <img src={FlipIconBack} alt="Flip" />
                  </FlipIconWrapper>
                </div>
              </CardFace>
            </CardInner>
          </TutorialItemWrapper>
        ))}
      </TutorialList>
    </PageWrapper>
  );
};

export default TutorialsPage;

import { useContext } from "react";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../PageWrapper.styled";
import {
  TutorialList,
  TutorialItemWrapper,
  ThumbnailBannerWrapper,
  TutorialThumbnail,
  BeginnerStarIcon,
  PremiumBanner,
} from "./TutorialsPage.styled";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import BeginnerStarImg from "../../assets/images/1-green-star.png";
import { UserContext } from "../../context/UserContext";
import { tutorialContent } from "../../assets/tutorialContent";
import PremiumLockImg from "../../assets/images/tutorials/lock.png";

const TutorialsPage: React.FC = () => {
  const {
    profile,
    favouriteTutorials = [],
    toggleFavourite = () => {},
    loading,
  } = useContext(UserContext) || {};

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(tutorialContent[2].isPremium);

  return (
    <PageWrapper>
      <Title textContent="Tutorials" />
      <TutorialList>
        {tutorialContent.map((tutorial) => (
          <TutorialItemWrapper key={tutorial.id}>
            {tutorial.isPremium ? (
              // Render premium tutorial layout, just update the styling
              <div>
                <ThumbnailBannerWrapper>
                  <BeginnerStarIcon src={BeginnerStarImg} />
                  {/* update profile/user to have isPremium enabled as well, but this will go along with stripe implementation */}
                  {profile && (
                    <FavouriteButton
                      isFavourited={favouriteTutorials.some(
                        (favTutorial) => favTutorial.id === tutorial.id
                      )}
                      onClick={() => toggleFavourite(tutorial.id, "tutorial")}
                      altText="Tutorial Favourite Button"
                    />
                  )}
                </ThumbnailBannerWrapper>
                <TutorialThumbnail to={`/tutorial/${tutorial.id}`}>
                  <h2 title={tutorial.title}>PREMIUM: {tutorial.title}</h2>
                  <img src={tutorial.image} alt={tutorial.title} />
                  <PremiumBanner>
                    <p>Premium</p>
                    <img src={PremiumLockImg} alt="lock" />
                  </PremiumBanner>
                </TutorialThumbnail>
              </div>
            ) : (
              // Render regular tutorial layout
              <div>
                <ThumbnailBannerWrapper>
                  <BeginnerStarIcon src={BeginnerStarImg} />
                  {profile && (
                    <FavouriteButton
                      isFavourited={favouriteTutorials.some(
                        (favTutorial) => favTutorial.id === tutorial.id
                      )}
                      onClick={() => toggleFavourite(tutorial.id, "tutorial")}
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
          </TutorialItemWrapper>
        ))}
      </TutorialList>
    </PageWrapper>
  );
};

export default TutorialsPage;

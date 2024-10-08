import { useContext } from "react";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../PageWrapper.styled";
import {
  TutorialList,
  TutorialItemWrapper,
  ThumbnailBannerWrapper,
  TutorialThumbnail,
  BeginnerStarIcon,
} from "./TutorialsPage.styled";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import BeginnerStarImg from "../../assets/images/1-green-star.png";
import { UserContext } from "../../context/UserContext";
import { tutorialContent } from "../../assets/tutorialContent";

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

  return (
    <PageWrapper>
      <Title textContent="Tutorials" />
      <TutorialList>
        {tutorialContent.map((tutorial) => (
          <TutorialItemWrapper key={tutorial.id}>
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
          </TutorialItemWrapper>
        ))}
      </TutorialList>
    </PageWrapper>
  );
};

export default TutorialsPage;

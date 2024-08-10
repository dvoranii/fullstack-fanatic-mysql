// TutorialsPage.tsx
import React, { useContext } from "react";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../global.styled";
import {
  TutorialList,
  TutorialItemWrapper,
  ThumbnailBannerWrapper,
  TutorialThumbnail,
  BeginnerStarIcon,
} from "./TutorialsPage.styled";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import { useContent } from "../../hooks/useContent";
import BeginnerStarImg from "../../assets/images/1-green-star.png";
import { UserContext } from "../../context/UserContext";

const TutorialsPage: React.FC = () => {
  const { profile } = useContext(UserContext) || {};
  const { items: tutorials, handleFavouriteClick } = useContent(
    "/api/tutorials",
    "tutorial"
  );

  return (
    <PageWrapper>
      <Title textContent="Tutorials" />
      <TutorialList>
        {tutorials.map((tutorial) => (
          <TutorialItemWrapper key={tutorial.id}>
            <ThumbnailBannerWrapper>
              <BeginnerStarIcon src={BeginnerStarImg} />
              {profile && (
                <FavouriteButton
                  isFavourited={tutorial.isFavourited}
                  onClick={() => handleFavouriteClick(tutorial.id)}
                  altText="Tutorial Favourite Button"
                />
              )}
            </ThumbnailBannerWrapper>

            <TutorialThumbnail to={`/tutorial/${tutorial.id}`}>
              <h2>{tutorial.title}</h2>
            </TutorialThumbnail>
          </TutorialItemWrapper>
        ))}
      </TutorialList>
    </PageWrapper>
  );
};

export default TutorialsPage;

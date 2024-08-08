import React, { useEffect, useState, useContext } from "react";
import { Tutorial } from "../../types/Tutorial";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../global.styled";
import {
  TutorialList,
  TutorialThumbnail,
  TutorialItemWrapper,
  ThumbnailBannerWrapper,
  BeginnerStarIcon,
} from "./TutorialsPage.styled";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import BeginnerStarImg from "../../assets/images/1-green-star.png";
import { UserContext } from "../../context/UserContext";
import {
  addFavourite,
  removeFavourite,
} from "../../services/favouritesService";
import { ContentType } from "../../types/ContentType";

const LOCAL_STORAGE_FAVOURITES_KEY = "userFavourites";

const TutorialsPage: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const { profile } = useContext(UserContext) || {};

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await fetch("/api/tutorials");
        const data = await response.json();
        const savedFavourites = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_FAVOURITES_KEY) || "[]"
        );

        const tutorialsWithFavourite = data.map((tutorial: Tutorial) => ({
          ...tutorial,
          isFavourited: savedFavourites.includes(tutorial.id),
        }));
        setTutorials(tutorialsWithFavourite);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      }
    };

    fetchTutorials();
  }, []);

  const handleFavouriteClick = async (id: number, type: ContentType) => {
    if (!profile) return;

    const googleId = profile.id;
    const itemType: ContentType = type;

    setTutorials((prevItems: Tutorial[]) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, isFavourited: !item.isFavourited } : item
      );

      const currentFavourites = updatedItems
        .filter((item) => item.isFavourited)
        .map((item) => item.id);
      localStorage.setItem(
        LOCAL_STORAGE_FAVOURITES_KEY,
        JSON.stringify(currentFavourites)
      );
      console.log("Updated Tutorials:", updatedItems);
      return updatedItems;
    });

    try {
      const item = tutorials.find((tutorial) => tutorial.id === id);
      if (!item) return;

      if (item.isFavourited) {
        await removeFavourite(googleId, id, itemType);
        console.log("Favourite removed");
      } else {
        await addFavourite(googleId, id, itemType);
        console.log("Favourite added");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                  onClick={() => handleFavouriteClick(tutorial.id, "tutorial")}
                  altText="Favourite Button"
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

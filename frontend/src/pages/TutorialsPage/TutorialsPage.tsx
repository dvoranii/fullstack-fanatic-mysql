import React, { useEffect, useState, useContext } from "react";
import { Tutorial } from "../../types/Tutorial";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../global.styled";
import {
  TutorialList,
  TutorialThumbnail,
  FavouriteIcon,
  TutorialItemWrapper,
  ThumbnailBannerWrapper,
  BeginnerStarIcon,
} from "./TutorialsPage.styled";
import FavouriteIconImg from "../../assets/images/bookmark.png";
import FavouriteIconImgFilled from "../../assets/images/bookmark(filled).png";
import BeginnerStarImg from "../../assets/images/1-green-star.png";
import { UserContext } from "../../context/UserContext";

const TutorialsPage: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const { profile } = useContext(UserContext) || {};

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await fetch("/api/tutorials");
        const data = await response.json();

        const tutorialsWithFavourite = data.map((tutorial: Tutorial) => ({
          ...tutorial,
          isFavourited: false,
        }));
        setTutorials(tutorialsWithFavourite);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      }
    };

    fetchTutorials();
  }, []);

  const handleFavouriteClick = async (id: number) => {
    // Toggle the favourite state locally
    setTutorials((prevTutorials) =>
      prevTutorials.map((tutorial) =>
        tutorial.id === id
          ? { ...tutorial, isFavourited: !tutorial.isFavourited }
          : tutorial
      )
    );

    // Get the user profile and find the selected tutorial
    if (!profile) return;
    const googleId = profile.id; // Assuming profile.id is the Google ID
    const tutorial = tutorials.find((tutorial) => tutorial.id === id);

    if (!tutorial) return;

    // Make the fetch call to update the favourites
    try {
      const response = await fetch("/api/tutorials/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          google_id: googleId,
          tutorial_id: tutorial.id,
          isFavourited: tutorial.isFavourited,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from server:", result);
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
                <FavouriteIcon
                  src={
                    tutorial.isFavourited
                      ? FavouriteIconImgFilled
                      : FavouriteIconImg
                  }
                  alt="Favourite Icon"
                  onClick={() => handleFavouriteClick(tutorial.id)}
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

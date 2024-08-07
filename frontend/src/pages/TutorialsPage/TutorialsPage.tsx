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

  const getUser = async (googleId: string) => {
    const response = await fetch(`/api/users?google_id=${googleId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  };

  const addFavourite = async (
    googleId: string,
    tutorialId: number,
    userId: number
  ) => {
    const response = await fetch("/api/tutorials/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        google_id: googleId,
        tutorial_id: tutorialId,
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  };

  const removeFavourite = async (
    googleId: string,
    tutorialId: number,
    userId: number
  ) => {
    const response = await fetch("/api/tutorials/favourites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        google_id: googleId,
        tutorial_id: tutorialId,
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  };

  const handleFavouriteClick = async (id: number) => {
    setTutorials((prevTutorials) => {
      const updatedTutorials = prevTutorials.map((tutorial) =>
        tutorial.id === id
          ? { ...tutorial, isFavourited: !tutorial.isFavourited }
          : tutorial
      );

      console.log("Updated Tutorials:", updatedTutorials);

      return updatedTutorials;
    });

    if (!profile) return;
    const googleId = profile.id;
    const tutorial = tutorials.find((tutorial) => tutorial.id === id);
    if (!tutorial) return;

    try {
      const userData = await getUser(googleId);
      const userId = userData.user_id;

      if (tutorial.isFavourited) {
        await removeFavourite(googleId, tutorial.id, userId);
        console.log("Favourite removed");
      } else {
        await addFavourite(googleId, tutorial.id, userId);
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

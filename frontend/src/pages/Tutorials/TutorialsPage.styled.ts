import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../GlobalStyles";

export const TutorialList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.2rem;
`;

export const TutorialItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
  background-color: #f8f8f8;
  padding-bottom: 24px;
  width: 300px; /* Set a fixed width for each tutorial item */
`;

export const TutorialThumbnail = styled(Link)`
  text-decoration: none;
  position: relative;
  color: inherit;
  width: 100%; /* Make sure the thumbnail takes the full width of the wrapper */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content like the image and title */

  &:hover {
    background: #f5f5f5;
  }

  h2 {
    font-family: "ZenKakuGothicNewMedium";
    margin-top: 0;
    padding: 12px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  img {
    width: 150px;
    height: auto;
  }
`;

export const ThumbnailBannerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #d9d9d9;
  padding: 12px;
  user-select: none;
`;

export const BeginnerStarIcon = styled.img`
  width: 35px;
  height: 35px;
`;

export const PremiumBanner = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 175, 43, 1) 10%,
    rgba(255, 222, 166, 1) 50%,
    rgba(255, 175, 43, 1) 83%
  );
  position: absolute;
  bottom: 35%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0px;
  /* border-bottom: 2px solid black;
  border-top: 2px solid black; */

  p {
    font-family: "Alata";
    text-transform: uppercase;
    font-size: 1.6rem;
    /* font-weight: bold; */
    color: ${colors.white};
    text-shadow: 1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black,
      -1px -1px 0 black;
    letter-spacing: 2px;
  }

  img {
    width: 35px;
    margin-left: 10px;
  }
`;

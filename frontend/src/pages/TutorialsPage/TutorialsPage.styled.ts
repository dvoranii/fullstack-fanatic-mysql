import styled from "styled-components";
import { Link } from "react-router-dom";

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

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
  padding-bottom: 24px;
  /* border: 1px solid #ddd; */
  /* padding: 1rem; */
`;

export const TutorialThumbnail = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: fit-content;
  box-sizing: border-box;
  background-color: #f8f8f8;

  &:hover {
    background: #f5f5f5;
  }

  h2 {
    font-family: "ZenKakuGothicNewMedium";
    margin-top: 0;
    padding: 12px;
  }
`;

export const ThumbnailBannerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #d9d9d9;
  padding: 12px;
  user-select: none;
`;

export const FavouriteIcon = styled.img`
  width: 25px;
  /* margin-bottom: 1.2rem; */

  &:hover {
    cursor: pointer;
  }
`;

export const BeginnerStarIcon = styled.img`
  width: 35px;
  height: 35px;
`;

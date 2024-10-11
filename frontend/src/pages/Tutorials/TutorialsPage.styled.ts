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
  width: 300px;
  perspective: 900px;
  max-height: 350px;
`;

export const TutorialThumbnail = styled(Link)`
  text-decoration: none;
  position: relative;
  color: inherit;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;

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

  p {
    font-family: "Alata";
    text-transform: uppercase;
    font-size: 1.6rem;
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

export const PremiumThumbnailWrapperOuter = styled.div`
  cursor: not-allowed;
  &:hover {
    cursor: not-allowed;
  }

  ${ThumbnailBannerWrapper} {
    cursor: not-allowed;
  }

  ${TutorialThumbnail} {
    cursor: not-allowed;
  }
`;

export const FlipIconWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;

  img {
    width: 30px;
    height: 30px;
  }
`;

export const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;

  &.is-flipped {
    transform: rotateY(180deg);
  }
`;

export const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 16px;
  box-shadow: 0px 3px 18px 3px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  &.card__face--front {
    background: #f8f8f8;
    display: flex;
    flex-direction: column;
  }

  &.card__face--back {
    background: #ffffff;
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
`;

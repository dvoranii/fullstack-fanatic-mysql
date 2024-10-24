import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../GlobalStyles";

export const TutorialListOuter = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const TutorialList = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  height: fit-content;
  overflow-y: visible;
  padding: 1.2rem 3.2rem;
  flex-wrap: wrap;
  column-gap: 1.2rem;
  row-gap: 2.2rem;
  margin-top: 1.2rem;

  @media (max-width: 1697px) {
    max-width: 90vw;
  }

  @media (max-width: 1089px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 849px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 570px) {
    grid-template-columns: 1fr;
  }
`;

export const TutorialItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  width: clamp(220px, 20vw, 300px);
  height: clamp(320px, 28vw, 350px);
  perspective: 900px;
  max-height: 350px;

  @media screen and (max-width: 621px) {
    width: clamp(200px, 25vw, 280px);
    height: clamp(320px, 28vw, 350px);
  }
  @media screen and (max-width: 570px) {
    width: clamp(250px, 22vw, 300px);
    height: clamp(350px, 30vw, 400px);
  }
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

export const StarIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 2px;
`;

export const DifficultyStarsWrapper = styled.div`
  display: flex;
  width: fit-content;
`;

export const PremiumBanner = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 175, 43, 1) 10%,
    rgba(255, 222, 166, 1) 50%,
    rgba(255, 175, 43, 1) 83%
  );
  position: absolute;
  bottom: 28%;
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
  bottom: 10px;
  right: 20px;
  height: 10%;
  user-select: none;

  img {
    width: 30px;
    height: 30px;
    transition: all 150ms ease;

    &:hover {
      filter: brightness(1.5);
    }
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

export const CardFace = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "back",
})<{ back?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  box-shadow: 0px 3px 18px 3px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ back }) => (back ? "#ffffff" : "#f8f8f8")};
  transform: ${({ back }) => (back ? "rotateY(180deg)" : "rotateY(0)")};
  padding: ${({ back }) => (back ? "16px" : "0")};
  align-items: ${({ back }) => (back ? "center" : "initial")};
  justify-content: ${({ back }) => (back ? "center" : "space-between")};
`;

export const BottomIconsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const AddToCartWrapper = styled.div`
  user-select: none;

  button {
    border: none;
    background: transparent;
  }
  img {
    width: 35px;
    margin-left: 10px;
    margin-bottom: 5px;

    transition: all 150ms ease;
    &:hover {
      filter: brightness(0.9);
    }
  }
`;

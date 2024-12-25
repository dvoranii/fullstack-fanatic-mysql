import styled from "styled-components";
import { colors } from "../../GlobalStyles";

export const BannerWrapperOuter = styled.div`
  position: relative;
  width: 100%;
`;
export const BannerWrapperInner = styled.div`
  width: 100%;
`;

export const BannerUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px;
  user-select: none;

  &:hover,
  input:hover,
  button:hover {
    cursor: pointer;
  }

  label > img {
    border-radius: 50%;
    box-sizing: 4px 4px 8px rgba(0, 0, 0, 1);
    transition: all 250ms ease;
    &:hover {
      cursor: pointer;
      filter: brightness(1.25);
    }
  }
`;

export const ProfileBanner = styled.div<{ banner_image: string }>`
  background: linear-gradient(
    to bottom,
    ${colors.black} 10%,
    ${colors.primary} 90%
  );
  padding: 20px 0;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  width: 100%;
  height: 250px;
  background-image: url(${(props) => props.banner_image});
  background-size: cover;
  background-position: center;
`;

export const ProfileContentWrapper = styled.div`
  width: 60%;
  margin: 75px auto;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 1024px) {
    width: 75%;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 2.4rem;
    grid-template-columns: 2fr 1fr !important;
    grid-template-rows: auto auto;
    row-gap: 1.2rem;
  }
`;

export const ProfilePictureWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 60%;
  user-select: none;
  margin: 150px auto;
  place-items: center;

  @media screen and (max-width: 1024px) {
    width: 75%;
  }

  @media screen and (max-width: 768px) {
    img {
      grid-column: 2;
    }
  }
`;

export const ProfileInfoColumn1 = styled.div`
  grid-column: 1;
  place-items: center;
  text-align: center;
  width: 100%;

  @media screen and (max-width: 768px) {
    grid-row: 1;
    grid-column: span 2;
  }
`;
export const ProfileInfoColumn2 = styled.div`
  grid-column: 2;
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  border-right: 2px solid lightgrey;
  border-left: 2px solid lightgrey;
  padding: 20px;

  @media screen and (max-width: 768px) {
    grid-row: 2;
    grid-column: 1;
    border-left: none;
  }
`;
export const ProfileInfoColumn3 = styled.div`
  grid-column: 3;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 20px;

  @media screen and (max-width: 768px) {
    grid-row: 2;
    grid-column: 2;
  }
`;

export const BioContentWrapper = styled.div`
  width: 100%;
  overflow-wrap: break-word;

  @media screen and (max-width: 768px) {
    height: 100%;
  }
`;

export const UserName = styled.h2`
  margin: 10px 0 5px;
`;

export const UserProfession = styled.h3`
  color: #333;
  margin-bottom: 0.8rem;
`;

export const UserInfoSubtitle = styled.h3`
  width: fit-content;
  margin-bottom: 0.8rem;
  border-bottom: 2px solid black;
`;

export const EditProfileLink = styled.a`
  color: #222222;
  text-decoration: underline;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 25px;
    margin-left: 0.4rem;
  }
`;

export const SocialSectionWrapperOuter = styled.div`
  width: 100%;
  user-select: none;
  padding-left: 20px;

  a {
    text-decoration: underline;
    color: blue;
  }
  p {
    margin-bottom: 0.4rem;
  }
  ul {
    display: flex;
    list-style: none;
    padding-inline-start: 0;
  }

  ul li {
    padding-left: 0.4rem;
    user-select: none;
  }
  ul li:first-child {
    padding-left: 0;
  }
  img {
    max-width: 25px;
  }

  span {
    padding-top: 0.4rem;
    padding-bottom: 0.8rem;
    display: flex;
    align-items: center;

    img {
      margin-right: 0.4rem;
    }
  }
`;

export const FollowsWrapper = styled.div`
  p {
    margin-bottom: 0;
  }
`;

export const PremiumBadge = styled.div<{ level: string }>`
  width: fit-content;
  padding: 4px 32px;
  background: ${({ level }) =>
    level === "starter"
      ? "linear-gradient(315deg, rgba(34, 185, 50, 1) 23%, rgba(157, 233, 165, 1) 50%, rgba(34, 185, 50, 1) 77%)"
      : level === "casual pro"
      ? "linear-gradient(315deg, rgba(34, 50, 185, 1) 23%, rgba(165, 185, 233, 1) 50%, rgba(34, 50, 185, 1) 77%)"
      : "linear-gradient(315deg, rgba(255, 215, 0, 1) 23%, rgba(255, 233, 165, 1) 50%, rgba(255, 215, 0, 1) 77%)"};
  clip-path: polygon(0 0, 100% 0, 85% 48%, 100% 100%, 0 100%, 15% 50%);
  font-size: 1rem;
  font-weight: bold;
  user-select: none;

  p {
    padding: 0 8px;
    color: white;
    text-shadow: 1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black,
      -1px -1px 0 black;
    letter-spacing: 1px;
  }
`;

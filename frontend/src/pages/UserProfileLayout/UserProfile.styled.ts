import styled from "styled-components";
import { PageWrapper } from "../../PageWrapper.styled";
import { Link } from "react-router-dom";
import { colors } from "../../GlobalStyles";

export const UserAccountContainer = styled(PageWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

export const AccountActivityWrapperOuter = styled.div`
  background-color: #eee;
`;

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

  &:hover,
  input:hover,
  button:hover {
    cursor: pointer;
  }
`;

export const ProfileBanner = styled.div<{ banner_image: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.banner_image});
  background-size: cover;
  background-position: center;
`;

export const ProfileContentWrapper = styled.div`
  position: absolute;
  left: 20%;
  top: 60%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  min-height: 200px;
  min-width: 55%;
  /* user-select: none; */

  @media (max-width: 959px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
`;

export const ProfilePictureWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  user-select: none;
`;

export const ProfileInfo = styled.div`
  text-align: center;
  grid-column: 1;
  border-right: 2px solid lightgrey;
  padding: 20px;

  h2 {
    font-family: "ZenKakuGothicNewMedium";
  }

  h3 {
    font-family: "ZenKakuGothicNewRegular";
  }

  button {
    text-transform: uppercase;
    padding: 8px 16px;
    font-weight: bold;
    background-color: #14213d;
    color: #f2f2f2f2;
    letter-spacing: 1.25px;
    border: none;
    border-radius: 20px;
  }
`;

export const ProfilePlaceholder = styled.div<{ height?: string }>`
  height: ${(props) => props.height || "190px"};

  @media (max-width: 959px) {
    height: ${(props) => props.height || "250px"};
  }
`;

export const BioContentWrapper = styled.div`
  overflow-wrap: break-word;
  border-right: 2px solid lightgrey;
  padding: 20px;

  @media (max-width: 959px) {
    border-right: none;
    grid-column: span 2;
    grid-row: 3;
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

export const AccountActivityTitle = styled.h2`
  font-size: 1.6rem;
  padding: 1.2rem 0 1.2rem 0;
  font-family: "Alata";
  letter-spacing: 0.5px;
  width: 100%;
  text-align: center;
  margin-top: 7.2rem;
  background: ${colors.secondary};
  color: #222;
  text-transform: uppercase;
`;

export const AccountActivity = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  gap: 8.2rem;
  margin-top: 40px;
`;

export const Section = styled.div`
  width: 45%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 40px 120px 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h3`
  text-transform: uppercase;
  font-size: 1.2rem;
  text-align: center;
  color: #031f2a;
  letter-spacing: 1px;
  padding-bottom: 2.4rem;
`;

export const SectionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  height: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const ViewAllButton = styled.button`
  background-color: #ffa500;
  border: none;
  color: white;
  padding: 4px 16px;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    background-color: #e69500;
  }
`;

export const FavouriteIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f5f5f5;
  border-radius: 50%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #007bff;

  img {
    width: 120%;
  }
`;

export const CommentHistory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .no-comments {
    width: 100%;
    text-align: center;
    color: #333;
    font-style: italic;
  }
`;

export const CommentItem = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CommentText = styled.p`
  font-size: 14px;
  margin: 0;
`;

export const CommentLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ViewMoreCommentsLink = styled(Link)`
  color: #007bff;
  font-size: 14px;
  cursor: pointer;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

export const SocialSectionWrapperOuter = styled.div`
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

export const FavWrapper = styled.div`
  width: 30%;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 20px 40px;
  user-select: none;
`;

export const PremiumBadge = styled.div<{ level: string }>`
  margin: 0.8rem auto;
  width: 90%;
  padding: 4px 16px;
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
    color: white;
    text-shadow: 1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black,
      -1px -1px 0 black;
    letter-spacing: 1px;
  }
`;

export const FavoritesDropdownWrapper = styled.div`
  width: 100%;
  display: flex;
  user-select: none;

  select {
    font-family: "Roboto";
    transition: all 150ms ease;
    &:hover {
      cursor: pointer;
      background-color: #eeeeee;
    }
    border: 1px solid black;
    border-radius: 4px;
    padding: 2px 4px;
    width: 20%;
    min-width: fit-content;
  }
`;

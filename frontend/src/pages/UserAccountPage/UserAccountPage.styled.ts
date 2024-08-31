import styled from "styled-components";
import { PageWrapper } from "../../global.styled";

export const UserAccountContainer = styled(PageWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

export const BannerWrapperOuter = styled.div`
  position: relative;
  width: 100%;
`;
export const BannerWrapperInner = styled.div`
  width: 100%;
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
  max-width: 65%;

  @media (max-width: 959px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
`;

export const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border: 4px solid white;
  border-radius: 50%;
  margin-bottom: 10px;
  place-self: center;
`;

export const ProfileInfo = styled.div`
  text-align: center;
  grid-column: 1;
  border-right: 2px solid lightgrey;
  padding: 20px;
`;

export const ProfilePlaceholder = styled.div`
  height: 190px;

  @media (max-width: 959px) {
    height: 250px;
  }
`;

export const BioContentWrapper = styled.div`
  overflow-wrap: break-word;
  border-right: 2px solid lightgrey;
  padding: 20px;

  h3 {
    border-bottom: 2px solid black;
    width: fit-content;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 959px) {
    border-right: none;
    grid-column: span 2;
    grid-row: 3;
  }
`;

export const UserName = styled.h1`
  font-size: 24px;
  margin: 10px 0 5px;
`;

export const UserProfession = styled.h2`
  font-size: 18px;
  color: #666;
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

export const AccountActivity = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 3.2rem;
  margin-top: 40px;
`;

export const Section = styled.div`
  width: 45%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

export const SectionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;

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
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

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

export const ViewMoreCommentsButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  font-size: 14px;
  cursor: pointer;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
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

export const SocialSectionWrapperOuter = styled.div`
  padding-left: 20px;
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

import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import {
  UserAccountContainer,
  ProfileBanner,
  ProfilePicture,
  UserName,
  UserProfession,
  EditProfileLink,
  AccountActivity,
  Section,
  SectionTitle,
  SectionContent,
  ViewAllButton,
  FavouriteIcon,
  CommentHistory,
  CommentItem,
  CommentText,
  CommentLink,
  ViewMoreCommentsButton,
  BannerWrapperInner,
  BannerWrapperOuter,
  ProfileContentWrapper,
  ProfileInfo,
  ProfilePlaceholder,
  BioContentWrapper,
  SocialSectionWrapper,
  BannerUploadWrapper,
} from "./UserAccountPage.styled";
import GithubIcon from "../../assets/images/account/github-icon.png";
import IgIcon from "../../assets/images/account/ig-icon.png";
import linkedinIcon from "../../assets/images/account/linkedin-icon.png";
import TiktokIcon from "../../assets/images/account/tiktok-icon.png";
import XIcon from "../../assets/images/account/x-icon.png";
import InboxIcon from "../../assets/images/account/inbox.png";
import EditIcon from "../../assets/images/account/edit.png";
import TutorialIcon from "../../assets/images/tutorial-icon.png";
import BlogIcon from "../../assets/images/blog-icon.png";
import { handleImageError } from "../../utils/imageUtils";
import { handleTokenExpiration } from "../../services/tokenService";

const UserAccountsPage: React.FC = () => {
  const context = useContext(UserContext);
  const [bannerImage, setBannerImage] = useState<File | null>(null);

  if (!context) {
    return <p>No user logged in</p>;
  }

  const { profile, favouriteTutorials, favouriteBlogs, loading, error } =
    context;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!profile) {
    return <p>No user logged in</p>;
  }

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    const file = event.target.files?.[0];
    if (file) {
      setBannerImage(file);
    }
  };

  const handleSubmit = async () => {
    if (bannerImage) {
      const formData = new FormData();
      formData.append("bannerImage", bannerImage);

      try {
        const token = await handleTokenExpiration();

        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await fetch("/api/users/upload-profile", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload images");
        }

        console.log("Images uploaded successfully");
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  return (
    <>
      <BannerWrapperOuter>
        <BannerWrapperInner>
          <ProfileBanner>
            <ProfileContentWrapper>
              <ProfilePicture
                src={profile.picture || ""}
                alt={`${profile.name}`}
                onError={handleImageError}
              />
              <ProfileInfo>
                <UserName>{profile.name || ""}</UserName>
                <UserProfession>Full Stack Developer</UserProfession>{" "}
                <EditProfileLink href="#">
                  Edit Profile <img src={EditIcon} alt="Edit Icon" />
                </EditProfileLink>
              </ProfileInfo>
              <BioContentWrapper>
                <p>
                  <b>BIO:</b>
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                  sint fuga voluptatum laboriosam praesentium cupiditate quas
                  numquam illo velit non possimus, eveniet dolores facilis nihil
                  incidunt id neque totam dolor?
                </p>
              </BioContentWrapper>
              <SocialSectionWrapper>
                <p>Links</p>
                <ul>
                  <li>
                    <a href="#">
                      <img src={GithubIcon} alt="Github Logo" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={IgIcon} alt="Instagram Logo" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={linkedinIcon} alt="LinkedIn Logo" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={TiktokIcon} alt="Tik Tok Logo" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={XIcon} alt="X Logo" />
                    </a>
                  </li>
                </ul>
                <span>
                  <img src={InboxIcon} alt="" /> Inbox
                </span>
                <a href="">127 Connections</a>
              </SocialSectionWrapper>
            </ProfileContentWrapper>
          </ProfileBanner>
        </BannerWrapperInner>
        <BannerUploadWrapper>
          <input
            className="banner-upload"
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Upload Banner
          </button>
        </BannerUploadWrapper>
      </BannerWrapperOuter>
      <ProfilePlaceholder />
      <UserAccountContainer>
        <AccountActivity>
          <Section>
            <SectionTitle>Favorites</SectionTitle>
            <SectionContent>
              <div>
                <FavouriteIcon>
                  <img src={TutorialIcon} alt="Tutorials" />
                </FavouriteIcon>
                <p>Tutorials</p>
                <ViewAllButton onClick={() => console.log(favouriteTutorials)}>
                  View All
                </ViewAllButton>
              </div>
              <div>
                <FavouriteIcon>
                  <img src={BlogIcon} alt="Tutorials" />
                </FavouriteIcon>
                <p>Blog Posts</p>
                <ViewAllButton onClick={() => console.log(favouriteBlogs)}>
                  View All
                </ViewAllButton>
              </div>
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Comment History</SectionTitle>
            <CommentHistory>
              <CommentItem>
                <CommentText>Sample comment text goes here.</CommentText>
                <CommentLink href="#">View Content</CommentLink>
              </CommentItem>
              <ViewMoreCommentsButton>See More</ViewMoreCommentsButton>
            </CommentHistory>
          </Section>
        </AccountActivity>
      </UserAccountContainer>
    </>
  );
};

export default UserAccountsPage;

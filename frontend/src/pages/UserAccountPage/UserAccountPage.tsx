// import { PageWrapper } from "../../global.styled";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { getUserFavourites } from "../../services/favouritesService";
import { Tutorial } from "../../types/Tutorial";
import { Blog } from "../../types/Blog";
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
} from "./UserAccountPage.styled";
import GithubIcon from "../../assets/images/account/github-icon.png";
import IgIcon from "../../assets/images/account/ig-icon.png";
import linkedinIcon from "../../assets/images/account/linkedin-icon.png";
import TiktokIcon from "../../assets/images/account/tiktok-icon.png";
import XIcon from "../../assets/images/account/x-icon.png";
import InboxIcon from "../../assets/images/account/inbox.png";
import EditIcon from "../../assets/images/account/edit.png";
import { handleImageError } from "../../utils/imageUtils";

const UserAccountsPage: React.FC = () => {
  const { profile } = useUser();
  const [favourites, setFavourites] = useState<{
    tutorials: Tutorial[];
    blogs: Blog[];
  }>({ tutorials: [], blogs: [] });

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const userFavourites = await getUserFavourites();
        setFavourites(userFavourites);
      } catch (error) {
        console.error("Failed to fetch user favourites:", error);
      }
    };

    if (profile) {
      fetchFavourites();
    }
  }, [profile]);

  return (
    <>
      <BannerWrapperOuter>
        <BannerWrapperInner>
          <ProfileBanner>
            <ProfileContentWrapper>
              <ProfilePicture
                src={profile?.picture}
                alt={`${profile?.name}`}
                onError={handleImageError}
              />
              <ProfileInfo>
                <UserName>{profile?.name || ""}</UserName>
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
      </BannerWrapperOuter>
      <ProfilePlaceholder />
      <UserAccountContainer>
        {profile ? (
          <AccountActivity>
            <Section>
              <SectionTitle>Favorites</SectionTitle>
              <SectionContent>
                <div>
                  <FavouriteIcon>
                    <i className="fas fa-book"></i>
                  </FavouriteIcon>
                  <p>Tutorials</p>
                  <ViewAllButton
                    onClick={() => console.log(favourites.tutorials)}
                  >
                    View All
                  </ViewAllButton>
                </div>
                <div>
                  <FavouriteIcon>
                    <i className="fas fa-pencil-alt"></i>
                  </FavouriteIcon>
                  <p>Blog Posts</p>
                  <ViewAllButton onClick={() => console.log(favourites.blogs)}>
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
        ) : (
          <p>No user logged in</p>
        )}
      </UserAccountContainer>
    </>
  );
};

export default UserAccountsPage;

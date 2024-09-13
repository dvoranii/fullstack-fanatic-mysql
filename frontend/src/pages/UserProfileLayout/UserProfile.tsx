import {
  ProfileBanner,
  ProfilePictureWrapper,
  ProfileInfo,
  UserName,
  UserProfession,
  BioContentWrapper,
  BannerWrapperOuter,
  BannerWrapperInner,
  ProfileContentWrapper,
  AccountActivity,
  AccountActivityTitle,
  Section,
  SectionTitle,
  UserInfoSubtitle,
  SectionContent,
  FavouriteIcon,
  CommentHistory,
  CommentItem,
  CommentText,
  CommentLink,
  ViewMoreCommentsButton,
  ViewAllButton,
  SocialSectionWrapperOuter,
  ProfilePlaceholder,
  BannerUploadWrapper,
  UserAccountContainer,
  AccountActivitySubBanner,
} from "./UserProfile.styled";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import SocialLinksDisplay from "./SocialLinksDisplay/SocialLinksDisplay";
import TutorialIcon from "../../assets/images/tutorial-icon.png";
import BlogIcon from "../../assets/images/blog-icon.png";
import { UserProfilePageProps } from "../../types/UserProfilePageProps";

const BASE_URL = "http://localhost:5000";

const UserProfilePage: React.FC<UserProfilePageProps> = ({
  profile,
  favouriteTutorials,
  favouriteBlogs,
  comments,
  isEditable = false,
  onEditProfileClick,
  onBannerChange,
  onBannerUpload,
  children,
}) => {
  const socialLinks = profile.social_links || {};

  return (
    <>
      <BannerWrapperOuter>
        <BannerWrapperInner>
          <ProfileBanner
            banner_image={
              profile.banner_image ? `${BASE_URL}${profile.banner_image}` : ""
            }
          >
            <ProfileContentWrapper>
              <ProfilePictureWrapper>
                <ProfilePicture
                  src={profile.profile_picture || ""}
                  alt={`${profile.name}`}
                  width="150px"
                  border="4px solid white"
                />
              </ProfilePictureWrapper>

              <ProfileInfo>
                <UserName>{profile.display_name || profile.name}</UserName>
                <UserProfession>{profile.profession}</UserProfession>
                {isEditable && (
                  <a href="#" onClick={onEditProfileClick}>
                    Edit Profile
                  </a>
                )}
              </ProfileInfo>

              <BioContentWrapper>
                <UserInfoSubtitle>Bio</UserInfoSubtitle>
                <p>{profile.bio || "No bio available."}</p>
              </BioContentWrapper>

              <SocialSectionWrapperOuter>
                <UserInfoSubtitle>Links</UserInfoSubtitle>
                <SocialLinksDisplay socialLinks={socialLinks} />

                {/* placeholder for the followers and inbox  */}
                {children}
              </SocialSectionWrapperOuter>
            </ProfileContentWrapper>
          </ProfileBanner>
        </BannerWrapperInner>
        {isEditable && (
          <BannerUploadWrapper>
            <input type="file" accept="image/*" onChange={onBannerChange} />
            <button onClick={onBannerUpload}>Upload Banner</button>
          </BannerUploadWrapper>
        )}
      </BannerWrapperOuter>

      <ProfilePlaceholder />

      <AccountActivityTitle>Account Activity</AccountActivityTitle>
      <AccountActivitySubBanner>
        <div>
          <SectionTitle>Favorites</SectionTitle>
        </div>
        <div>
          <SectionTitle>Comment History</SectionTitle>
        </div>
      </AccountActivitySubBanner>
      <UserAccountContainer>
        <AccountActivity>
          <Section>
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
                  <img src={BlogIcon} alt="Blogs" />
                </FavouriteIcon>
                <p>Blogs</p>
                <ViewAllButton onClick={() => console.log(favouriteBlogs)}>
                  View All
                </ViewAllButton>
              </div>
            </SectionContent>
          </Section>

          <Section>
            <CommentHistory>
              {comments.map((comment) => (
                <CommentItem key={comment.id}>
                  <CommentText>{comment.content}</CommentText>
                  <CommentLink href="#">View Content</CommentLink>
                </CommentItem>
              ))}
              <ViewMoreCommentsButton>See More</ViewMoreCommentsButton>
            </CommentHistory>
          </Section>
        </AccountActivity>
      </UserAccountContainer>
    </>
  );
};

export default UserProfilePage;

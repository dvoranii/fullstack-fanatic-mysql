import { useState, useEffect } from "react";
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
  FollowsWrapper,
} from "./UserProfile.styled";
import TutorialIcon from "../../assets/images/tutorial-icon.png";
import BlogIcon from "../../assets/images/blog-icon.png";

import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import SocialLinksDisplay from "./SocialLinksDisplay/SocialLinksDisplay";
import { UserProfilePageProps } from "../../types/UserProfilePageProps";
import ConnectButton from "./ConnectButton/ConnectButton";
import MessageUserModal from "./MessageUserModal/MessageUserModal";
import FollowButton from "./FollowButton/FollowButton";
import {
  fetchFollowersState,
  fetchFollowingState,
} from "../../services/followService";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchFollowData = async () => {
      try {
        const followersState = await fetchFollowersState(profile.id);
        const followingState = await fetchFollowingState(profile.id);

        setFollowersCount(followersState.followersCount);
        setIsFollowing(followersState.isFollowing);
        setFollowingCount(followingState.followingCount);
      } catch (error) {
        console.error("Error fetching follow data:", error);
      }
    };

    fetchFollowData();
  }, [profile.id]);

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
                  bg="grey"
                />
              </ProfilePictureWrapper>

              <ProfileInfo>
                <UserName>{profile.display_name || profile.name}</UserName>
                <UserProfession>{profile.profession}</UserProfession>

                {!isEditable && (
                  <ConnectButton
                    text={"Message"}
                    onClick={() => setIsModalOpen(true)}
                  />
                )}

                {!isEditable && (
                  <FollowButton
                    userId={profile.id}
                    isFollowing={isFollowing}
                    setIsFollowing={setIsFollowing}
                    setFollowersCount={setFollowersCount}
                  />
                )}

                {isEditable && (
                  // add wrapper so I can add underline here, this is a quick fix
                  <a href="#" onClick={onEditProfileClick}>
                    <u>Edit Profile</u>
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
                {children}

                <FollowsWrapper>
                  <p>
                    {followersCount}{" "}
                    {followersCount === 1 ? "Follower" : "Followers"}
                  </p>
                </FollowsWrapper>
                <FollowsWrapper>
                  <p>{followingCount} Following</p>
                </FollowsWrapper>
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
      <MessageUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSendMessage={(subject, message) => {
          console.log("Message sent to user:", { subject, message });
        }}
        userId={String(profile.id)}
      />
    </>
  );
};

export default UserProfilePage;
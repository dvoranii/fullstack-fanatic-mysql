import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  CommentHistory,
  CommentItem,
  CommentText,
  CommentLink,
  ViewMoreCommentsLink,
  SocialSectionWrapperOuter,
  ProfilePlaceholder,
  BannerUploadWrapper,
  UserAccountContainer,
  FollowsWrapper,
  PremiumBadge,
  AccountActivityWrapperOuter,
} from "./UserProfile.styled";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import SocialLinksDisplay from "./SocialLinksDisplay/SocialLinksDisplay";
import { UserProfilePageProps } from "../../types/User/UserProfilePageProps";
import FollowButton from "./FollowButton/FollowButton";
import {
  fetchFollowersState,
  fetchFollowingState,
} from "../../services/followService";

import MessageModalButton from "../../components/MessageModalButton/MessageModalButton";
import FavoritesSection from "./FavoritesSection/FavoritesSection";

const BASE_URL = "http://localhost:5000";

const UserProfilePage: React.FC<UserProfilePageProps> = ({
  profile,
  comments,
  isEditable = false,
  isOwnProfile,
  publicUserId,
  onEditProfileClick,
  onBannerChange,
  onBannerUpload,
  children,
}) => {
  const loggedInUser = profile;

  const socialLinks = profile.social_links || {};
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

                {!isEditable && loggedInUser && (
                  <MessageModalButton
                    userId={profile.id.toString()}
                    variant="publicUser"
                  />
                )}
                {!isEditable && loggedInUser && (
                  <FollowButton
                    userId={profile.id}
                    isFollowing={isFollowing}
                    setIsFollowing={setIsFollowing}
                    setFollowersCount={setFollowersCount}
                  />
                )}

                {isEditable && (
                  <a href="#" onClick={onEditProfileClick}>
                    <u>Edit Profile</u>
                  </a>
                )}

                {!!profile.isPremium && profile.premiumLevel && (
                  <PremiumBadge level={profile.premiumLevel}>
                    <p>{profile.premiumLevel.toUpperCase()}</p>
                  </PremiumBadge>
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
                  <Link
                    to={
                      isOwnProfile
                        ? "/my-account/followers"
                        : `/user/${profile.id}/followers`
                    }
                  >
                    {followersCount}{" "}
                    {followersCount === 1 ? "Follower" : "Followers"}
                  </Link>
                </FollowsWrapper>
                <FollowsWrapper>
                  <Link
                    to={
                      isOwnProfile
                        ? "/my-account/following"
                        : `/user/${profile.id}/following`
                    }
                  >
                    {followingCount} Following
                  </Link>
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

      {/* might need different approach */}
      {!isEditable ? (
        <ProfilePlaceholder height="300px" />
      ) : (
        <ProfilePlaceholder height="190px" />
      )}

      <AccountActivityTitle>Account Activity</AccountActivityTitle>

      <AccountActivityWrapperOuter>
        <UserAccountContainer>
          <AccountActivity>
            <Section className="favorites-section">
              <SectionTitle>Favorites</SectionTitle>

              <FavoritesSection
                isOwnProfile={isOwnProfile}
                publicUserId={publicUserId}
              />
            </Section>

            <Section>
              <SectionTitle>Comment History</SectionTitle>
              <CommentHistory>
                {comments.length === 0 ? (
                  <p className="no-comments">No comments available</p>
                ) : (
                  <>
                    {comments.slice(0, 5).map((comment) => (
                      <CommentItem key={comment.id}>
                        <CommentText>{comment.content}</CommentText>
                        {comment.content_type === "tutorial" ? (
                          <CommentLink
                            href={`/tutorial/${comment.content_id}/comments/${comment.id}`}
                          >
                            View in Tutorial
                          </CommentLink>
                        ) : (
                          <CommentLink
                            href={`/blog/${comment.content_id}/comments/${comment.id}`}
                          >
                            View in Blog
                          </CommentLink>
                        )}
                      </CommentItem>
                    ))}

                    <ViewMoreCommentsLink
                      to={
                        isOwnProfile
                          ? "/my-account/comment-history"
                          : `/user/${profile.id}/comment-history`
                      }
                    >
                      See All Comments
                    </ViewMoreCommentsLink>
                  </>
                )}
              </CommentHistory>
            </Section>
          </AccountActivity>
        </UserAccountContainer>
      </AccountActivityWrapperOuter>
    </>
  );
};

export default UserProfilePage;

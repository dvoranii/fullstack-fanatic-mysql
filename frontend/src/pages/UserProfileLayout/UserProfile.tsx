import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  ProfileBanner,
  ProfilePictureWrapper,
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
  BannerUploadWrapper,
  UserAccountContainer,
  FollowsWrapper,
  PremiumBadge,
  AccountActivityWrapperOuter,
  EditProfileLink,
  ProfileInfoColumn1,
  ProfileInfoColumn2,
  ProfileInfoColumn3,
} from "./UserProfile.styled";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import SocialLinksDisplay from "./SocialLinksDisplay/SocialLinksDisplay";
import { UserProfilePageProps } from "../../types/User/UserProfilePageProps";
import FollowButton from "./FollowButton/FollowButton";
import {
  fetchFollowersState,
  fetchFollowingState,
} from "../../services/followService";
import { UserContext } from "../../context/UserContext";
import MessageModalButton from "../../components/MessageModalButton/MessageModalButton";
import FavoritesSection from "./FavoritesSection/FavoritesSection";
import { truncateText } from "../../utils/textUtils";

const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const UserProfilePage: React.FC<UserProfilePageProps> = ({
  profile,
  comments,
  isEditable = false,
  isOwnProfile,
  publicUserId,
  onEditProfileClick,
  onBannerChange,
  children,
}) => {
  const userContext = useContext(UserContext);
  const loggedInUser = userContext?.profile;

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
            <ProfilePictureWrapper>
              <ProfilePicture
                src={profile.profile_picture || ""}
                alt={`${profile.name}`}
                width="150px"
                border="4px solid white"
                bg="grey"
              />
            </ProfilePictureWrapper>
          </ProfileBanner>
        </BannerWrapperInner>
        {isEditable && (
          <BannerUploadWrapper>
            <label htmlFor="banner-file-upload">
              <img
                src="/assets/images/account/edit.webp"
                alt="Edit banner"
                height="48"
                width="48"
              />
            </label>
            <input
              id="banner-file-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onBannerChange}
            />
          </BannerUploadWrapper>
        )}
      </BannerWrapperOuter>

      <ProfileContentWrapper>
        <ProfileInfoColumn1>
          <UserName>{profile.display_name || profile.name}</UserName>
          <UserProfession>{profile.profession}</UserProfession>

          {!!profile.isPremium && profile.premiumLevel && (
            <PremiumBadge level={profile.premiumLevel}>
              <p>{profile.premiumLevel.toUpperCase()}</p>
            </PremiumBadge>
          )}

          {isEditable && (
            <EditProfileLink href="#" onClick={onEditProfileClick}>
              <u>Edit Profile</u>
            </EditProfileLink>
          )}

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
        </ProfileInfoColumn1>
        <ProfileInfoColumn2>
          <BioContentWrapper>
            <UserInfoSubtitle>Bio</UserInfoSubtitle>
            <p>{profile.bio || "No bio available."}</p>
          </BioContentWrapper>
        </ProfileInfoColumn2>
        <ProfileInfoColumn3>
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
                {followersCount}&nbsp;
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
        </ProfileInfoColumn3>
      </ProfileContentWrapper>

      <AccountActivityTitle>Account Activity</AccountActivityTitle>

      <AccountActivityWrapperOuter>
        {isOwnProfile && (
          <Link to="/my-account/settings">
            <img
              src="/assets/images/settings-gear.png"
              alt="settings gear"
              title="Settings"
              className="settings-gear"
            />
          </Link>
        )}

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
                        <CommentText>
                          {truncateText(comment.content, 50)}
                        </CommentText>
                        {comment.content_type === "tutorial" ? (
                          <CommentLink
                            href={`/tutorial/${comment.content_id}/comments/${comment.id}`}
                          >
                            View&nbsp;in&nbsp;Tutorial
                          </CommentLink>
                        ) : (
                          <CommentLink
                            href={`/blog/${comment.content_id}/comments/${comment.id}`}
                          >
                            View&nbsp;in&nbsp;Blog
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
      <div style={{ height: "0" }}>&nbsp;</div>
    </>
  );
};

export default UserProfilePage;

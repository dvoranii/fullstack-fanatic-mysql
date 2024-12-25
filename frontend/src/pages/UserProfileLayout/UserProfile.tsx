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
  UserInfoSubtitle,
  SocialSectionWrapperOuter,
  BannerUploadWrapper,
  FollowsWrapper,
  PremiumBadge,
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
import AccountActivity from "./AccountActivity/AccountActivity";

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
      <AccountActivity
        isOwnProfile={isOwnProfile}
        publicUserId={publicUserId}
        profileId={profile.id}
        comments={comments}
      />

      <div style={{ height: "0" }}>&nbsp;</div>
    </>
  );
};

export default UserProfilePage;

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
  PremiumBadgeWrapper,
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
import BlockButton from "../../components/BlockButton/BlockButton";


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
  const [bannerImage, setBannerImage] = useState(profile.banner_image);
  const [profilePicture, setProfilePicture] = useState(profile.profile_picture);
  const userContext = useContext(UserContext);
  const loggedInUser = userContext?.profile;

  const socialLinks = profile.social_links || {};
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const [isBlocked, setIsBlocked] = useState(false);

  const handleBlockStatusChange = (blocked: boolean) => {
    setIsBlocked(blocked);
  }

  useEffect(() => {
    setBannerImage(profile.banner_image);
    setProfilePicture(profile.profile_picture);
  }, [profile.banner_image, profile.profile_picture]);

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
          <ProfileBanner banner_image={bannerImage || ""}>
            <ProfilePictureWrapper>
              <ProfilePicture
                src={profilePicture || ""}
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
                src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/account/edit.webp"
                alt="Edit banner"
                height="38"
                width="38"
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
            <PremiumBadgeWrapper>
            <PremiumBadge level={profile.premiumLevel}>
              <p>{profile.premiumLevel.toUpperCase()}</p>
            </PremiumBadge>
            </PremiumBadgeWrapper>
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
              isBlocked={isBlocked}
            />
          )}
          {!isEditable && loggedInUser && (
            <FollowButton
              userId={profile.id}
              isFollowing={isFollowing}
              setIsFollowing={setIsFollowing}
              setFollowersCount={setFollowersCount}
              isBlocked={isBlocked}
            />
          )}
        <br/>
        {!isEditable && loggedInUser && (
          <BlockButton 
            userId={profile.id}
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
            setFollowersCount={setFollowersCount}
            onBlockStatusChange={handleBlockStatusChange}
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

      <div style={{ height: "1px" }}>&nbsp;</div>
    </>
  );
};

export default UserProfilePage;

import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import {
  UserAccountContainer,
  ProfileBanner,
  ProfilePictureWrapper,
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
  SocialSectionWrapperOuter,
  BannerUploadWrapper,
} from "./UserAccountPage.styled";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import InboxIcon from "../../assets/images/account/inbox.png";
import EditIcon from "../../assets/images/account/edit.png";
// import EditIcon2 from "../../assets/images/account/edit-icon.png";
import TutorialIcon from "../../assets/images/tutorial-icon.png";
import BlogIcon from "../../assets/images/blog-icon.png";
import { handleImageError } from "../../utils/imageUtils";
import { handleTokenExpiration } from "../../services/tokenService";
import SocialLinksDisplay from "./SocialLinksDisplay/SocialLinksDisplay";

const BASE_URL = "http://localhost:5000";

const UserAccountsPage: React.FC = () => {
  const context = useContext(UserContext);
  const [bannerimage, setBannerImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    profile,
    setProfile,
    favouriteTutorials,
    favouriteBlogs,
    loading,
    error,
  } = context || {};

  if (!context) {
    return <p>No user logged in</p>;
  }

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
    const file = event.target.files?.[0];
    if (file) {
      setBannerImage(file);
    }
  };

  const handleSubmit = async () => {
    if (bannerimage) {
      const formData = new FormData();
      formData.append("bannerimage", bannerimage);

      try {
        const token = await handleTokenExpiration();

        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await fetch("/api/profile/upload-banner", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload images");
        }

        const data = await response.json();
        console.log("Image uploaded successfully", data);

        if (setProfile) {
          setProfile({
            ...profile,
            banner_image: data.bannerImagePath,
          });
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  const socialLinks = profile.social_links || {};

  return (
    <>
      {isModalOpen && profile && setProfile && (
        <EditProfileModal
          profile={profile}
          setProfile={setProfile}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      <BannerWrapperOuter>
        <BannerWrapperInner>
          <ProfileBanner
            banner_image={
              profile.banner_image ? `${BASE_URL}${profile.banner_image}` : ""
            }
          >
            <ProfileContentWrapper>
              <ProfilePictureWrapper>
                {/* <img src={EditIcon2} alt="" /> */}
                <ProfilePicture
                  src={profile.picture || ""}
                  alt={`${profile.name}`}
                  onError={handleImageError}
                />
              </ProfilePictureWrapper>

              <ProfileInfo>
                <UserName>
                  {profile.display_name ? profile.display_name : profile.name}
                </UserName>
                <UserProfession>{profile.profession}</UserProfession>
                <EditProfileLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }}
                >
                  Edit Profile <img src={EditIcon} alt="Edit Icon" />
                </EditProfileLink>
              </ProfileInfo>
              <BioContentWrapper>
                <h3>Bio</h3>
                <p>{profile.bio || "No bio available."}</p>
              </BioContentWrapper>
              <SocialSectionWrapperOuter>
                <SocialLinksDisplay socialLinks={socialLinks} />
                <span>
                  <img src={InboxIcon} alt="" /> Inbox
                </span>
                <a href="">127 Connections</a>
              </SocialSectionWrapperOuter>
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

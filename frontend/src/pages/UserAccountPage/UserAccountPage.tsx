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
import TutorialIcon from "../../assets/images/tutorial-icon.png";
import BlogIcon from "../../assets/images/blog-icon.png";
import { handleImageError } from "../../utils/imageUtils";
import SocialLinksDisplay from "./SocialLinksDisplay/SocialLinksDisplay";
import { uploadImage } from "../../services/imageUploadService";
import { ImageUploadResponse } from "../../types/ImageUploadResponse";

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

  const handleBannerUpload = async () => {
    if (bannerimage) {
      const formData = new FormData();
      formData.append("bannerimage", bannerimage);

      try {
        const data: ImageUploadResponse = await uploadImage(
          "/api/profile/upload-banner",
          formData
        );

        if (data.imagePath && setProfile) {
          setProfile({
            ...profile,
            banner_image: data.imagePath,
          });
        }
      } catch (error) {
        console.error("Error uploading banner image: ", error);
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
                <ProfilePicture
                  src={
                    profile.profile_picture
                      ? `${BASE_URL}${profile.profile_picture}`
                      : ""
                  }
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
          <button type="submit" onClick={handleBannerUpload}>
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

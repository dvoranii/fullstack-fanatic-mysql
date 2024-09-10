import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import UserProfilePage from "../UserProfile";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { uploadImage } from "../../../services/imageUploadService";
import { ImageUploadResponse } from "../../../types/ImageUploadResponse";
import InboxIcon from "../../../assets/images/account/inbox.png";

const UserAccountsPage: React.FC = () => {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profile, setProfile, favouriteTutorials, favouriteBlogs, comments } =
    useContext(UserContext) || {};

  if (!profile) return <p>No user logged in</p>;

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBannerImage(file);
    }
  };

  const handleBannerUpload = async () => {
    if (bannerImage) {
      const formData = new FormData();
      formData.append("bannerimage", bannerImage);
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

  return (
    <>
      {isModalOpen && setProfile && (
        <EditProfileModal
          profile={profile}
          setProfile={setProfile}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      <UserProfilePage
        profile={profile}
        favouriteTutorials={favouriteTutorials || []}
        favouriteBlogs={favouriteBlogs || []}
        comments={comments || []}
        isEditable={true}
        onEditProfileClick={() => setIsModalOpen(true)}
        onBannerChange={handleBannerChange}
        onBannerUpload={handleBannerUpload}
      >
        <span>
          <img src={InboxIcon} alt="Inbox Icon" /> Inbox
        </span>
        <a href="#">127 Connections</a>
      </UserProfilePage>
    </>
  );
};

export default UserAccountsPage;

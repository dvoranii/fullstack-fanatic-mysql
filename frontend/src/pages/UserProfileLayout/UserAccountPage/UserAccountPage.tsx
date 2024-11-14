import { InboxWrapper, InboxImgWrapper } from "./UserAccountPage.styled";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import UserProfilePage from "../UserProfile";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { uploadImage } from "../../../services/imageUploadService";
import { ImageUploadResponse } from "../../../types/ImageUploadResponse";
import InboxIcon from "../../../assets/images/account/inbox.png";
import { getUnreadConversationsCount } from "../../../services/messageService";
import NotificationBadge from "../../../components/NotificationBadge/NotificationBadge";

const UserAccountsPage: React.FC = () => {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profile, setProfile, comments } = useContext(UserContext) || {};
  const [unreadInboxCount, setUnreadInboxCount] = useState(0);

  useEffect(() => {
    const fetchUnreadInboxCount = async () => {
      try {
        const count = await getUnreadConversationsCount();
        setUnreadInboxCount(count);
      } catch (error) {
        console.error("Failed to fetch unread conversations count:", error);
      }
    };

    fetchUnreadInboxCount();
  }, []);

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
        comments={comments || []}
        isEditable={true}
        isOwnProfile={true}
        onEditProfileClick={() => setIsModalOpen(true)}
        onBannerChange={handleBannerChange}
        onBannerUpload={handleBannerUpload}
      >
        <InboxWrapper>
          <a href="/my-account/inbox">
            <InboxImgWrapper>
              <img src={InboxIcon} alt="Inbox Icon" />
            </InboxImgWrapper>
            Inbox
          </a>
          <NotificationBadge count={unreadInboxCount} />
        </InboxWrapper>
      </UserProfilePage>
    </>
  );
};

export default UserAccountsPage;

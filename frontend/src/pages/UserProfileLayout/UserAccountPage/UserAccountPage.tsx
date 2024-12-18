import { Helmet } from "react-helmet-async";
import { InboxWrapper, InboxImgWrapper } from "./UserAccountPage.styled";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import UserProfilePage from "../UserProfile";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { uploadBannerImage } from "../../../services/imageUploadService";
import { ImageUploadResponse } from "../../../types/ImageUploadResponse";
import InboxIcon from "../../../assets/images/account/inbox.png";
import { getUnreadConversationsCount } from "../../../services/conversationService";
import NotificationBadge from "../../../components/NotificationBadge/NotificationBadge";
import { useCsrfToken } from "../../../hooks/useCsrfToken";

const UserAccountsPage: React.FC = () => {
  const csrfToken = useCsrfToken();
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

  const handleBannerChangeAndUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("bannerimage", file);

      try {
        const data: ImageUploadResponse = await uploadBannerImage(
          formData,
          csrfToken
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
      <Helmet>
        <title>{`${profile.name}'s Account - Full Stack Fanatic`}</title>
        <meta
          name="description"
          content={`Manage your account settings, upload a banner, and view your inbox. Welcome, ${profile.name}!`}
        />
      </Helmet>
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
        onBannerChange={handleBannerChangeAndUpload}
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

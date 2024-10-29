import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import {
  FollowListWrapper,
  FollowTitleBanner,
  EmptyMessage,
  FollowButtonsWrapper,
  FollowerInfoWrapper,
  FollowerLinkWrapperInner,
} from "../FollowList.styled";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { User } from "../../../../types/User/User";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";
import { PageWrapper } from "../../../../PageWrapper.styled";
import MessageUserModal from "../../MessageUserModal/MessageUserModal";
import { fetchFollowers } from "../../../../services/followService";

interface FollowersListProps {
  userId?: number;
}

const FollowersList: React.FC<FollowersListProps> = ({ userId }) => {
  const userContext = useContext(UserContext);
  const loggedInUser = userContext?.profile;

  const { id } = useParams<{ id: string }>();
  const effectiveUserId = userId || Number(id);

  const [followers, setFollowers] = useState<User[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!effectiveUserId) return;
    const fetchFollowersList = async () => {
      try {
        const followersData = await fetchFollowers(effectiveUserId);
        setFollowers(followersData);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowersList();
  }, [effectiveUserId]);

  const handleOpenMessageModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseMessageModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <FollowTitleBanner>
        <h2>Followers</h2>
      </FollowTitleBanner>
      <PageWrapper>
        <FollowListWrapper>
          <ul>
            {followers.length > 0 ? (
              followers.map((user) => (
                <li key={user.id}>
                  <Link to={`/user/${user.id}`}>
                    <FollowerLinkWrapperInner>
                      <ProfilePicture
                        src={user.profile_picture || ""}
                        alt={user.name}
                        width={"60px"}
                        border={"1px solid black"}
                      />

                      <FollowerInfoWrapper>
                        <h4>{user.name}</h4>
                        <h5>{user.profession}</h5>
                      </FollowerInfoWrapper>
                    </FollowerLinkWrapperInner>
                  </Link>

                  {loggedInUser && (
                    <FollowButtonsWrapper>
                      <button
                        onClick={() =>
                          handleOpenMessageModal(user.id.toString())
                        }
                      >
                        Message
                      </button>
                    </FollowButtonsWrapper>
                  )}
                </li>
              ))
            ) : (
              <>
                <EmptyMessage>No followers yet</EmptyMessage>
              </>
            )}
          </ul>
        </FollowListWrapper>
      </PageWrapper>

      {selectedUserId && (
        <MessageUserModal
          isOpen={isModalOpen}
          onClose={handleCloseMessageModal}
          userId={selectedUserId}
          onSendMessage={(subject, message) =>
            console.log(
              `Message sent to user ${selectedUserId}: ${subject}, ${message}`
            )
          }
        />
      )}
    </>
  );
};

export default FollowersList;

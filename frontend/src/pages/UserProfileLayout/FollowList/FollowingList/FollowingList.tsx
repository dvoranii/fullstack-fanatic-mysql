import { useState, useEffect, useContext } from "react";
import {
  FollowListWrapper,
  FollowTitleBanner,
  EmptyMessage,
  FollowButtonsWrapper,
} from "../FollowList.styled";
import { PageWrapper } from "../../../../PageWrapper.styled";
import { Link, useParams } from "react-router-dom";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";
import { User } from "../../../../types/User/User";
import {
  fetchFollowing,
  unfollowUser,
} from "../../../../services/followService";
import { UserContext } from "../../../../context/UserContext";
import MessageUserModal from "../../MessageUserModal/MessageUserModal";

interface FollowingListProps {
  userId?: number;
}

const FollowingList: React.FC<FollowingListProps> = ({ userId }) => {
  const { profile: loggedInUser } = useContext(UserContext) || {};
  const { id } = useParams<{ id: string }>();
  const effectiveUserId = userId || Number(id);
  const [following, setFollowing] = useState<User[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!effectiveUserId) return;
    const fetchFollowingList = async () => {
      try {
        const followingData = await fetchFollowing(effectiveUserId);
        setFollowing(followingData);
      } catch (error) {
        console.error("Error fetching following:", error);
      }
    };

    fetchFollowingList();
  }, [effectiveUserId]);

  const handleUnfollow = async (followingId: number) => {
    const removedUser = following.find((user) => user.id === followingId);

    // Optimistically remove the user from the UI state
    setFollowing((prev) => prev.filter((user) => user.id !== followingId));

    try {
      const status = await unfollowUser(followingId);
      if (status !== 200) {
        if (removedUser) {
          setFollowing((prev) => [...prev, removedUser]);
        }
        console.error("Error: Failed to unfollow the user.");
      }
    } catch (error) {
      if (removedUser) {
        setFollowing((prev) => [...prev, removedUser]);
      }
      console.error("Error unfollowing user:", error);
    }
  };

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
        <h2>Following</h2>
      </FollowTitleBanner>
      <PageWrapper>
        <FollowListWrapper>
          <ul>
            {following.length > 0 ? (
              following.map((user) => (
                <li key={user.id}>
                  <Link to={`/user/${user.id}`}>
                    <ProfilePicture
                      src={user.profile_picture || ""}
                      alt={user.name}
                      width={"60px"}
                      border={"1px solid black"}
                    />
                    <span>{user.name}</span>
                    <span>{user.profession}</span>
                  </Link>

                  <FollowButtonsWrapper>
                    {loggedInUser?.id === effectiveUserId && (
                      <button onClick={() => handleUnfollow(user.id)}>
                        Unfollow
                      </button>
                    )}
                    {loggedInUser && (
                      <button
                        onClick={() =>
                          handleOpenMessageModal(user.id.toString())
                        }
                      >
                        Message
                      </button>
                    )}
                  </FollowButtonsWrapper>
                </li>
              ))
            ) : (
              <>
                <EmptyMessage>Not following anyone yet</EmptyMessage>
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

export default FollowingList;

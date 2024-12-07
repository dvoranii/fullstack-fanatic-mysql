import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import { PageWrapper } from "../../../../PageWrapper.styled";
import {
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
} from "../../../../services/followService";
import TitleBanner from "../../../../components/TitleBanner/TitleBanner";
import UserList from "../../../../components/UserList/UserList";
import { User } from "../../../../types/User/User";
import { useCsrfToken } from "../../../../hooks/useCsrfToken";

interface FollowersListProps {
  userId?: number;
}

const FollowersList: React.FC<FollowersListProps> = ({ userId }) => {
  const csrfToken = useCsrfToken();
  const { id } = useParams<{ id: string }>();
  const effectiveUserId = userId || Number(id);

  const userContext = useContext(UserContext);
  const loggedInUser = userContext?.profile;

  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<number[]>([]);

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

    const fetchFollowingList = async () => {
      try {
        if (loggedInUser) {
          const followingData = await fetchFollowing(loggedInUser.id);
          const followingIds = followingData.map((user: User) => user.id);
          setFollowing(followingIds);
        }
      } catch (error) {
        console.error("Error fetching following list:", error);
      }
    };

    fetchFollowersList();
    fetchFollowingList();
  }, [effectiveUserId, loggedInUser]);

  const handleFollow = async (userId: number) => {
    try {
      const status = await followUser(userId, csrfToken);
      if (status === 200) {
        setFollowing((prev) => [...prev, userId]);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (userId: number) => {
    setFollowing((prev) => prev.filter((id) => id !== userId));
    try {
      const status = await unfollowUser(userId, csrfToken);
      if (status !== 200) {
        setFollowing((prev) => [...prev, userId]);
      }
    } catch (error) {
      setFollowing((prev) => [...prev, userId]);
      console.error("Error unfollowing user:", error);
    }
  };

  const isFollowing = (userId: number) => following.includes(userId);

  return (
    <>
      <TitleBanner textContent="Followers" />
      <PageWrapper>
        <UserList
          users={followers}
          loggedInUserId={loggedInUser?.id}
          isFollowing={isFollowing}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
          removeUserAfterUnfollow={false}
          hideButtons={!loggedInUser || loggedInUser.id !== userId}
        />
      </PageWrapper>
    </>
  );
};

export default FollowersList;

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import { PageWrapper } from "../../../../PageWrapper.styled";

import {
  fetchFollowing,
  unfollowUser,
} from "../../../../services/followService";
import TitleBanner from "../../../../components/TitleBanner/TitleBanner";
import UserList from "../../../../components/UserList/UserList";
import { User } from "../../../../types/User/User";
import { useCsrfToken } from "../../../../hooks/useCsrfToken";

interface FollowingListProps {
  userId?: number;
}

const FollowingList: React.FC<FollowingListProps> = ({ userId }) => {
  const csrfToken = useCsrfToken();
  const { id } = useParams<{ id: string }>();
  const effectiveUserId = userId || Number(id);

  const { profile: loggedInUser } = useContext(UserContext) || {};
  const [following, setFollowing] = useState<User[]>([]);

  useEffect(() => {
    if (!effectiveUserId) return;

    const fetchFollowingList = async () => {
      try {
        const followingData = await fetchFollowing(effectiveUserId);
        setFollowing(followingData);
      } catch (error) {
        console.error("Error fetching following list:", error);
      }
    };

    fetchFollowingList();
  }, [effectiveUserId, loggedInUser]);

  const handleUnfollow = async (userId: number) => {
    setFollowing((prev) => prev.filter((user) => user.id !== userId));
    try {
      const status = await unfollowUser(userId, csrfToken);
      if (status !== 200) {
        console.error("Error: Failed to unfollow the user.");
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const isFollowing = (userId: number) =>
    following.some((user) => user.id === userId);

  return (
    <>
      <TitleBanner textContent="Following" />
      <PageWrapper>
        <UserList
          users={following}
          loggedInUserId={loggedInUser?.id}
          isFollowing={isFollowing}
          handleFollow={() => {}}
          handleUnfollow={handleUnfollow}
          removeUserAfterUnfollow={true}
          hideButtons={!loggedInUser || loggedInUser.id !== effectiveUserId}
        />
      </PageWrapper>
    </>
  );
};

export default FollowingList;

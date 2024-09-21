// FollowButton.tsx
import { useState, useEffect } from "react";
import {
  fetchFollowState,
  followUser,
  unfollowUser,
} from "../../../services/followService";

interface FollowButtonProps {
  userId: number;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const followState = await fetchFollowState(userId);
        setIsFollowing(followState.isFollowing);
        setFollowersCount(followState.followersCount);
      } catch (error) {
        console.error("Error fetching follow state:", error);
      }
    };

    fetchState();
  }, [userId]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
        setIsFollowing(false);
        setFollowersCount((prev) => prev - 1);
      } else {
        await followUser(userId);
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error following/unfollowing:", error);
    }
  };

  return (
    <button onClick={handleFollowToggle}>
      {isFollowing ? "Unfollow" : "Follow"} ({followersCount})
    </button>
  );
};

export default FollowButton;

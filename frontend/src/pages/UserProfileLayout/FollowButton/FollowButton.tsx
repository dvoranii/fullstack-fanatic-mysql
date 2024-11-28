import { followUser, unfollowUser } from "../../../services/followService";
import { FollowBtn } from "./FollowButton.styled";
interface FollowButtonProps {
  userId: number;
  isFollowing: boolean;
  setIsFollowing: (isFollowing: boolean) => void;
  setFollowersCount: (count: number | ((prevCount: number) => number)) => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  isFollowing,
  setIsFollowing,
  setFollowersCount,
}) => {
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
    <FollowBtn onClick={handleFollowToggle}>
      {isFollowing ? "Unfollow" : "Follow"}
    </FollowBtn>
  );
};

export default FollowButton;

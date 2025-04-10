import { followUser, unfollowUser } from "../../../services/followService";
import { FollowBtn } from "./FollowButton.styled";
import { useCsrfToken } from "../../../hooks/useCsrfToken";
import { useState } from "react";
interface FollowButtonProps {
  userId: number;
  isFollowing: boolean;
  setIsFollowing: (isFollowing: boolean) => void;
  setFollowersCount: (count: number | ((prevCount: number) => number)) => void;
  isBlocked?: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  isFollowing,
  setIsFollowing,
  setFollowersCount,
  isBlocked = false
}) => {
  const csrfToken = useCsrfToken();
  const [isLoading, _setIsLoading] = useState(false);
  
  const handleFollowToggle = async () => {
    if (isBlocked) return;

    try {
      if (isFollowing) {
        await unfollowUser(userId, csrfToken);
        setIsFollowing(false);
        setFollowersCount((prev) => prev - 1);
      } else {
        await followUser(userId, csrfToken);
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error following/unfollowing:", error);
    }
  };

  return (
    <FollowBtn 
    onClick={handleFollowToggle}
    disabled={isLoading || isBlocked}
    $isBlocked={isBlocked}
    $isFollowing={isFollowing}
    >
   {isLoading 
        ? "Processing..." 
        : isBlocked 
          ? "User Blocked" 
          : isFollowing 
            ? "Unfollow" 
            : "Follow"}
    </FollowBtn>
  );
};

export default FollowButton;

import { useState, useEffect, useContext } from "react";
import { apiCall } from "../../../utils/apiUtils";
import { Link, useParams } from "react-router-dom";
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";
import { User } from "../../../types/User";
import { unfollowUser } from "../../../services/followService";
import { UserContext } from "../../../context/UserContext";

interface FollowingResponse {
  following: User[];
}

interface FollowingListProps {
  userId?: number;
}

const FollowingList: React.FC<FollowingListProps> = ({ userId }) => {
  const { profile } = useContext(UserContext) || {};
  const { id } = useParams<{ id: string }>();
  const effectiveUserId = userId || Number(id);
  const [following, setFollowing] = useState<User[]>([]);

  useEffect(() => {
    if (!effectiveUserId) return;
    const fetchFollowing = async () => {
      try {
        const { data } = await apiCall<FollowingResponse>(
          `/api/users/${effectiveUserId}/following-list`
        );
        console.log(data);
        setFollowing(data.following);
      } catch (error) {
        console.error("Error fetching following:", error);
      }
    };

    fetchFollowing();
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

  return (
    <div>
      <h2>Following</h2>
      <ul>
        {following.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>
              <ProfilePicture
                src={user.profile_picture || ""}
                alt={user.name}
                width={"40px"}
                border={"1px solid black"}
              />
              <span>{user.name}</span>
            </Link>

            {profile?.id === effectiveUserId && (
              <button onClick={() => handleUnfollow(user.id)}>Unfollow</button>
            )}

            <button onClick={() => console.log(`Message ${user.name}`)}>
              Message
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;

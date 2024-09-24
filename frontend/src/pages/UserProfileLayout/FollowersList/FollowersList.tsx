import { useState, useEffect } from "react";
import { apiCall } from "../../../utils/apiUtils";
import { Link, useParams } from "react-router-dom";
import { User } from "../../../types/User";
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";

interface FollowersResponse {
  followers: User[];
}

interface FollowersListProps {
  userId?: number;
}

const FollowersList: React.FC<FollowersListProps> = ({ userId }) => {
  const { id } = useParams<{ id: string }>();
  const effectiveUserId = userId || Number(id);

  const [followers, setFollowers] = useState<User[]>([]);

  useEffect(() => {
    if (!effectiveUserId) return;
    const fetchFollowers = async () => {
      try {
        const { data } = await apiCall<FollowersResponse>(
          `/api/users/${effectiveUserId}/followers-list`
        );
        console.log(data);
        setFollowers(data.followers);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowers();
  }, [effectiveUserId]);

  return (
    <div>
      <h2>Followers</h2>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>
            <Link to={`/user/${follower.id}`}>
              <ProfilePicture
                src={follower.profile_picture || ""}
                alt={follower.name}
                width={"40px"}
                border={"1px solid black"}
              />
              <span>{follower.name}</span>
            </Link>
            <button onClick={() => console.log(`Message ${follower.name}`)}>
              Message
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;

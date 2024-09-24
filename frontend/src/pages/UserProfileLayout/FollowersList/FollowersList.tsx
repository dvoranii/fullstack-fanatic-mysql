import { useState, useEffect } from "react";
import { apiCall } from "../../../utils/apiUtils";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  profile_picture: string;
}

interface FollowersResponse {
  followers: User[];
}

const FollowersList = ({ userId }: { userId: number }) => {
  const [followers, setFollowers] = useState<User[]>([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const { data } = await apiCall<FollowersResponse>(
          `/api/users/${userId}/followers-list`
        );
        setFollowers(data.followers);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowers();
  }, [userId]);

  return (
    <div>
      <h2>Followers</h2>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>
            <Link to={`/users/${follower.id}`}>
              <img src={follower.profile_picture} alt={follower.name} />
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

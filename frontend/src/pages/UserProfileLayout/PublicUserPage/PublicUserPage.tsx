import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserProfilePage from "../UserProfile";
import { PublicProfile } from "../../../types/PublicProfileType";
import { getUserPublicProfile } from "../../../services/userService";
import { UserContext } from "../../../context/UserContext";

const PublicUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const loggedInUser = userContext?.profile;

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loggedInUser && Number(id) && Number(id) === Number(loggedInUser.id)) {
      navigate("/my-account", { replace: true });
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getUserPublicProfile(id || "");
        setProfile(data);
      } catch (error) {
        setError("Failed to load user profile");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!profile) return <p>User profile not found</p>;

  return (
    <UserProfilePage
      profile={profile.user}
      favouriteTutorials={profile.favouriteTutorials}
      favouriteBlogs={profile.favouriteBlogs}
      comments={profile.comments || []}
    >
      <a href="#">127 Connections</a>
    </UserProfilePage>
  );
};

export default PublicUserPage;

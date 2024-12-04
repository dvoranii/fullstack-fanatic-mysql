import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserProfilePage from "../UserProfile";
import { PublicProfile } from "../../../types/PublicProfileType";
import { getUserPublicProfile } from "../../../services/userService";
import { getPublicUserFavourites } from "../../../services/favouritesService"; // Importing the new function
import { UserContext } from "../../../context/UserContext";
import { fetchUserComments } from "../../../services/commentService";
import { Blog } from "../../../types/Blog/Blog";
import { Tutorial } from "../../../types/Tutorial/Tutorial";

const PublicUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const loggedInUser = userContext?.profile;

  const effectiveUserId =
    loggedInUser && Number(id) === Number(loggedInUser.id)
      ? loggedInUser.id
      : Number(id);

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<{
    tutorials: Tutorial[];
    blogs: Blog[];
  }>({
    tutorials: [],
    blogs: [],
  });

  useEffect(() => {
    if (loggedInUser && Number(id) && Number(id) === Number(loggedInUser.id)) {
      navigate("/my-account", { replace: true });
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getUserPublicProfile(
          effectiveUserId.toString() || ""
        );
        const commentsData = await fetchUserComments(effectiveUserId);
        setProfile({ ...data, comments: commentsData.comments });
      } catch (error) {
        setError("Failed to load user profile");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    const fetchFavourites = async () => {
      try {
        const favouritesData = await getPublicUserFavourites(effectiveUserId);
        setFavourites(favouritesData);
      } catch (error) {
        console.error("Failed to fetch public user favourites:", error);
      }
    };

    fetchFavourites();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!profile) return <p>User profile not found</p>;

  return (
    <>
      <Helmet>
        <title>{`${profile.user.name}'s Profile - Full Stack Fanatic`}</title>
        <meta
          name="description"
          content={`View ${profile.user.name}'s tutorials, blogs, and comments on Full Stack Fanatic.`}
        />
      </Helmet>
      <UserProfilePage
        profile={profile.user}
        publicUserId={effectiveUserId}
        favouriteTutorials={favourites.tutorials}
        favouriteBlogs={favourites.blogs}
        comments={profile.comments || []}
        isOwnProfile={false}
      ></UserProfilePage>
    </>
  );
};

export default PublicUserPage;

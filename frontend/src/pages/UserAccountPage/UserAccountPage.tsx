import { PageWrapper } from "../../global.styled";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { getUserFavourites } from "../../services/favouritesService";
import { Tutorial } from "../../types/Tutorial";
import { Blog } from "../../types/Blog";

const UserAccountsPage: React.FC = () => {
  const { profile } = useUser();
  const [favourites, setFavourites] = useState<{
    tutorials: Tutorial[];
    blogs: Blog[];
  }>({ tutorials: [], blogs: [] });

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const userFavourites = await getUserFavourites();
        setFavourites(userFavourites);
      } catch (error) {
        console.error("Failed to fetch user favourites:", error);
      }
    };

    if (profile) {
      fetchFavourites();
    }
  }, [profile]);

  return (
    <PageWrapper>
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />

          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <br />
          <h3>Your Favourited Tutorials:</h3>
          <ul>
            {favourites.tutorials.map((tutorial) => (
              <li key={tutorial.id}>{tutorial.title}</li>
            ))}
          </ul>
          <h3>Your Favourited Blogs:</h3>
          <ul>
            {favourites.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
    </PageWrapper>
  );
};

export default UserAccountsPage;

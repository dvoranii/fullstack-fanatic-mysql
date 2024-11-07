import { useContext, useState, useEffect } from "react";
import Title from "../../components/Title/Title";
import {
  BlogList,
  BlogItem,
  BlogContent,
  BlogActions,
  BlogImgWrapper,
  FreeBadge,
  PremiumBadge,
  SeeMoreButtonWrapper,
  BlogPageWrapper,
} from "./BlogsPage.styled";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import { UserContext } from "../../context/UserContext";
import { blogContent } from "../../assets/blogContent";
import PremiumLockImg from "../../assets/images/lock.png";
import PremiumUnlockImg from "../../assets/images/unlocked.png";
import SearchBar from "../../components/SearchBar/SearchBar";
import SquaresAndTriangles from "../../assets/images/SquaresAndTriangles.svg";
import { BlogContentItem } from "../../types/Blog/Blog";

const BlogsPage: React.FC = () => {
  const {
    profile,
    favouriteBlogs = [],
    toggleFavourite = () => {},
  } = useContext(UserContext) || {};

  const [visibleBlogs, setVisibleBlogs] = useState<number>(4);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setVisibleBlogs(4);
  }, [searchText]);

  const handleSeeMore = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 4);
  };

  const filteredBlogs = blogContent.filter((blog) =>
    blog.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const canAccessBlog = (blog: BlogContentItem) => {
    if (!blog.isPremium) {
      return true;
    }

    return Boolean(profile?.isPremium);
  };

  return (
    <BlogPageWrapper>
      <Title textContent="Blogs" />
      <BlogList>
        <SearchBar paddingLeft="0" onChange={(value) => setSearchText(value)} />
        <img
          src={SquaresAndTriangles}
          className="squares-and-triangles"
          alt=""
        />
        <div className="block-1"></div>
        {filteredBlogs.slice(0, visibleBlogs).map((blog) => {
          const isPremiumLocked = blog.isPremium && !profile;
          const hasAccess = canAccessBlog(blog);

          return (
            <BlogItem key={blog.id}>
              <BlogImgWrapper>
                <img src={blog.image} alt={blog.title} title={blog.title} />
              </BlogImgWrapper>
              <BlogContent
                to={isPremiumLocked ? "#" : `/blog/${blog.id}`}
                style={{ cursor: isPremiumLocked ? "not-allowed" : "pointer" }}
                onClick={(e) => {
                  if (isPremiumLocked) e.preventDefault();
                }}
              >
                <h2>{blog.title}</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aliquam ab, voluptatibus quia ea cum adipisci fuga
                  exercitationem, voluptatum eos nobis esse odio molestias
                  distinctio quibusdam! Optio veniam quae repellat itaque.
                </p>
              </BlogContent>
              <BlogActions>
                {blog.isPremium === false ? (
                  <FreeBadge>
                    <p>FREE</p>
                  </FreeBadge>
                ) : (
                  <PremiumBadge hasAccess={hasAccess}>
                    <p>Premium</p>
                    {canAccessBlog(blog) ? (
                      <img src={PremiumUnlockImg} alt="Unlocked" />
                    ) : (
                      <img src={PremiumLockImg} alt="Locked" />
                    )}
                  </PremiumBadge>
                )}
                {profile && (
                  <FavouriteButton
                    isFavourited={favouriteBlogs.some(
                      (favBlog) => favBlog.id === blog.id
                    )}
                    onClick={() => toggleFavourite(blog.id, "blog")}
                    altText="Blog Favourite Button"
                  />
                )}
              </BlogActions>
            </BlogItem>
          );
        })}
      </BlogList>
      {visibleBlogs < filteredBlogs.length && (
        <SeeMoreButtonWrapper>
          <button onClick={handleSeeMore}>See More Blogs</button>
        </SeeMoreButtonWrapper>
      )}
    </BlogPageWrapper>
  );
};

export default BlogsPage;

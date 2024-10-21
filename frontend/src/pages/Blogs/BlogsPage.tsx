import { useContext, useState, useEffect } from "react";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../PageWrapper.styled";
import {
  BlogList,
  BlogItem,
  BlogContent,
  BlogActions,
  BlogImgWrapper,
  FreeBadge,
  PremiumBadge,
  SeeMoreButtonWrapper,
} from "./BlogsPage.styled";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import { UserContext } from "../../context/UserContext";
import { blogContent } from "../../assets/blogContent";
import PremiumLockImg from "../../assets/images/lock.png";
import SearchBar from "../../components/SearchBar/SearchBar";

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

  return (
    <PageWrapper>
      <Title textContent="Blogs" />
      <BlogList>
        <SearchBar
          paddingLeft="0"
          onSearchChange={(value) => setSearchText(value)}
        />
        {filteredBlogs.slice(0, visibleBlogs).map((blog) => (
          <BlogItem key={blog.id}>
            <BlogImgWrapper>
              <img src={blog.image} alt={blog.title} title={blog.title} />
            </BlogImgWrapper>
            <BlogContent to={`/blog/${blog.id}`}>
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
                <PremiumBadge>
                  <p>Premium</p>
                  <img src={PremiumLockImg} alt="Lock" />
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
        ))}
      </BlogList>
      {visibleBlogs < filteredBlogs.length && (
        <SeeMoreButtonWrapper>
          <button onClick={handleSeeMore}>See More Blogs</button>
        </SeeMoreButtonWrapper>
      )}
    </PageWrapper>
  );
};

export default BlogsPage;

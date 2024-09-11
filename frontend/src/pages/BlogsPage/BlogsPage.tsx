import React, { useContext } from "react";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../PageWrapper.styled";
import {
  BlogList,
  BlogItem,
  BlogContent,
  BlogActions,
} from "./BlogsPage.styled";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import { UserContext } from "../../context/UserContext";
import { blogContent } from "../../assets/blogContent";

const BlogsPage: React.FC = () => {
  const {
    profile,
    favouriteBlogs = [],
    toggleFavourite = () => {},
  } = useContext(UserContext) || {};

  return (
    <PageWrapper>
      <Title textContent="Blogs" />
      <BlogList>
        {blogContent.map((blog) => (
          <BlogItem key={blog.id}>
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
              {profile && (
                <FavouriteButton
                  isFavourited={favouriteBlogs.some(
                    (favBlog) => favBlog.id === blog.id
                  )}
                  onClick={() => toggleFavourite(blog.id, "blog")}
                  altText="Blog Favourite Button"
                />
              )}

              <span className="badge">FREE</span>
            </BlogActions>
          </BlogItem>
        ))}
      </BlogList>
    </PageWrapper>
  );
};

export default BlogsPage;

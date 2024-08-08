import React from "react";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../global.styled";
import {
  BlogList,
  BlogItem,
  BlogContent,
  BlogActions,
} from "./BlogsPage.styled";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import { useContent } from "../../hooks/useContent";

const BlogsPage: React.FC = () => {
  const { items: blogs, handleFavouriteClick } = useContent(
    "/api/blogs",
    "blog"
  );

  return (
    <PageWrapper>
      <Title textContent="Blogs" />
      <BlogList>
        {blogs.map((blog) => (
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
              <FavouriteButton
                isFavourited={blog.isFavourited}
                onClick={() => handleFavouriteClick(blog.id)}
                altText="Blog Favourite Button"
              />
              <span className="badge">FREE</span>
            </BlogActions>
          </BlogItem>
        ))}
      </BlogList>
    </PageWrapper>
  );
};

export default BlogsPage;

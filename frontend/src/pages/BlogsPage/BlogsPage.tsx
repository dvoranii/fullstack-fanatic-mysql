import React, { useEffect, useState, useContext } from "react";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../global.styled";
import {
  BlogList,
  BlogItem,
  BlogContent,
  BlogActions,
} from "./BlogsPage.styled";
import { UserContext } from "../../context/UserContext";
import { Blog } from "../../types/Blog";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { profile } = useContext(UserContext) || {};

  useEffect(() => {
    fetch("/api/blogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  const handleBlogFavouriteClick = (id: number) => {
    console.log(`Blog ${id} clicked`);
  };

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
              {profile && (
                <FavouriteButton
                  isFavourited={false}
                  onClick={() => handleBlogFavouriteClick(blog.id)}
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

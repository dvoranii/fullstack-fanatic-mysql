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
import {
  addFavourite,
  removeFavourite,
} from "../../services/favouritesService";
import { ContentType } from "../../types/ContentType";

const LOCAL_STORAGE_FAVOURITES_KEY = "userBlogFavourites";

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { profile } = useContext(UserContext) || {};

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        const savedFavourites = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_FAVOURITES_KEY) || "[]"
        );

        const blogsWithFavourite = data.map((blog: Blog) => ({
          ...blog,
          isFavourited: savedFavourites.includes(blog.id),
        }));
        setBlogs(blogsWithFavourite);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogFavouriteClick = async (id: number, type: ContentType) => {
    if (!profile) return;

    const googleId = profile.id;
    const itemType: ContentType = type;

    setBlogs((prevItems: Blog[]) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, isFavourited: !item.isFavourited } : item
      );

      const currentFavourites = updatedItems
        .filter((item) => item.isFavourited)
        .map((item) => item.id);
      localStorage.setItem(
        LOCAL_STORAGE_FAVOURITES_KEY,
        JSON.stringify(currentFavourites)
      );
      console.log("Updated Blogs:", updatedItems);
      return updatedItems;
    });

    try {
      const item = blogs.find((blog) => blog.id === id);
      if (!item) return;

      if (item.isFavourited) {
        await removeFavourite(googleId, id, itemType);
        console.log("Favourite removed");
      } else {
        await addFavourite(googleId, id, itemType);
        console.log("Favourite added");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
                  isFavourited={blog.isFavourited}
                  onClick={() => handleBlogFavouriteClick(blog.id, "blog")}
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

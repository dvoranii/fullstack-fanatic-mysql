import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import { PageContainer, BlogList, BlogThumbnail } from "./BlogsPage.styled";

interface Blog {
  id: number;
  title: string;
  created_at: string;
}

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <PageContainer>
      <Title textContent="Blogs" />
      <BlogList>
        {blogs.map((blog) => (
          <BlogThumbnail to={`/blog/${blog.id}`} key={blog.id}>
            <h2>{blog.title}</h2>
          </BlogThumbnail>
        ))}
      </BlogList>
    </PageContainer>
  );
};

export default BlogsPage;

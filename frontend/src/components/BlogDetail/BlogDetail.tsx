import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../Title/Title";
import { BlogDetailWrapper } from "./BlogDetail.styled";
import { blogContent } from "../../assets/blogContent";
import Accordion from "../Accordion/Accordion";
import CommentSection from "../CommentSection/CommentSection";

interface Blog {
  id: number;
  title: string;
  created_at: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then((response) => response.json())
      .then((data: Blog) => setBlog(data));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  const content = blogContent[blog.id];

  return (
    <BlogDetailWrapper>
      <Title textContent={blog.title} />
      <Accordion steps={content.steps} />
      <CommentSection contentId={blog.id} contentType="blog" />
    </BlogDetailWrapper>
  );
};

export default BlogDetail;

import React from "react";
import { useParams } from "react-router-dom";
import Title from "../Title/Title";
import { BlogDetailWrapper } from "./BlogDetail.styled";
import { blogContent } from "../../assets/blogContent";
import Accordion from "../Accordion/Accordion";
import CommentSection from "../CommentSection/CommentSection";
import { BlogContentItem } from "../../types/Blog/BlogContentItem";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const blog: BlogContentItem | undefined = blogContent.find(
    (blog) => blog.id === Number(id)
  );

  if (!blog) {
    return <div>Error: Blog not found</div>;
  }

  if (!blog.steps) {
    return <div>Error: Steps not found for this blog</div>;
  }

  return (
    <BlogDetailWrapper>
      <Title textContent={blog.title} />
      <Accordion steps={blog.steps} />
      <CommentSection contentId={blog.id} contentType="blog" />
    </BlogDetailWrapper>
  );
};

export default BlogDetail;

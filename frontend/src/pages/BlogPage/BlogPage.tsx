import React from "react";
import Title from "../../components/Title/Title";
import { BlogPageWrapper } from "./BlogPage.styled";

const BlogPage: React.FC = () => {
  return (
    <BlogPageWrapper>
      <Title textContent="Blog" />
    </BlogPageWrapper>
  );
};

export default BlogPage;

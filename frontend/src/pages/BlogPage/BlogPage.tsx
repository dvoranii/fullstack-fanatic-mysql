import React from "react";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../global.styled";

const BlogPage: React.FC = () => {
  return (
    <PageWrapper>
      <Title textContent="Blog" />
    </PageWrapper>
  );
};

export default BlogPage;

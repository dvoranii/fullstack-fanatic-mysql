import React from "react";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../PageWrapper.styled";

const AboutPage: React.FC = () => {
  return (
    <PageWrapper>
      <Title textContent="About" />
    </PageWrapper>
  );
};

export default AboutPage;

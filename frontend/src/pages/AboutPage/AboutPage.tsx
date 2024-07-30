import React from "react";
import Title from "../../components/Title/Title";
// import { AboutPageWrapper } from "./AboutPage.styled";
import { PageWrapper } from "../../global.styled";

const AboutPage: React.FC = () => {
  return (
    <PageWrapper>
      <Title textContent="About" />
    </PageWrapper>
  );
};

export default AboutPage;

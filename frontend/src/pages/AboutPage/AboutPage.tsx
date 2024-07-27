import React from "react";
import Title from "../../components/Title/Title";
import { AboutPageWrapper } from "./AboutPage.styled";

const AboutPage: React.FC = () => {
  return (
    <AboutPageWrapper>
      <Title textContent="About" />
    </AboutPageWrapper>
  );
};

export default AboutPage;

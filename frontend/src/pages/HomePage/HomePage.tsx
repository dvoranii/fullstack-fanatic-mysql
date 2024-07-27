import React from "react";
import Title from "../../components/Title/Title";
import { HomePageWrapper } from "./HomePage.styled";

const HomePage: React.FC = () => {
  return (
    <HomePageWrapper>
      <Title textContent="Home" />
    </HomePageWrapper>
  );
};

export default HomePage;

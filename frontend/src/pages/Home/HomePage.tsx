import { HomePageWrapper } from "./HomePage.styled";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../../context/UserContext";
import Hero from "./Hero/Hero";
import IntroSection from "./IntroSection/IntroSection";
import InfoSection from "./InfoSection/InfoSection";

const HomePage: React.FC = () => {
  // const { profile } = useContext(UserContext) || {};

  return (
    <HomePageWrapper>
      {/* {!profile && <Link to="register">No account? Sign up!</Link>} */}
      <Hero />
      <IntroSection />
      <InfoSection />
    </HomePageWrapper>
  );
};

export default HomePage;

import { HomePageWrapper } from "./HomePage.styled";
import Hero from "./Hero/Hero";
import IntroSection from "./IntroSection/IntroSection";
import InfoSection from "./InfoSection/InfoSection";

const HomePage: React.FC = () => {
  return (
    <HomePageWrapper>
      <Hero />
      <IntroSection />
      <InfoSection />
    </HomePageWrapper>
  );
};

export default HomePage;

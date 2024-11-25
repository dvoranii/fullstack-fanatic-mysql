import { HomePageWrapper } from "./HomePage.styled";
import Hero from "./Hero/Hero";
import IntroSection from "./IntroSection/IntroSection";
import InfoSection from "./InfoSection/InfoSection";
import ProductsAndServices from "./ProductsAndServices/ProductsAndServices";

const HomePage: React.FC = () => {
  return (
    <HomePageWrapper>
      <Hero />
      <IntroSection />
      <InfoSection />
      <ProductsAndServices />
    </HomePageWrapper>
  );
};

export default HomePage;

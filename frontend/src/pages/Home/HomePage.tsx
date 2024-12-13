import { Helmet } from "react-helmet-async";
import { HomePageWrapper } from "./HomePage.styled";
import Hero from "./Hero/Hero";
import IntroSection from "./IntroSection/IntroSection";
import InfoSection from "./InfoSection/InfoSection";
import ProductsAndServices from "./ProductsAndServices/ProductsAndServices";
import CTASection from "./CTASection/CTASection";

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home - Full Stack Fanatic</title>
        <meta
          name="description"
          content="Stay ahead in today's competitive job market with Fullstack Fanatic. Our platform offers real-world tutorials, hands-on projects, and a personalized learning journey to help you master the skills employers demand."
        />
      </Helmet>
      <HomePageWrapper>
        <Hero />
        <IntroSection />
        <InfoSection />
        <ProductsAndServices />
        <CTASection />
      </HomePageWrapper>
    </>
  );
};

export default HomePage;

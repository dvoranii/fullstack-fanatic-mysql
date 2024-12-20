import { Helmet } from "react-helmet-async";
import { HomePageWrapper } from "./HomePage.styled";
import Hero from "./Hero/Hero";
import LazySection from "../../components/LazyLoad/LazySection/LazySection";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home - Full Stack Fanatic</title>
        <meta
          name="description"
          content="Stay ahead in today's competitive job market with Fullstack Fanatic. Our platform offers real-world tutorials, hands-on projects, and a personalized learning journey to help you master the skills employers demand."
        />
        <link
          rel="preload"
          href="/assets/images/wave-effect-bg.webp"
          as="image"
        />
        <link
          rel="preload"
          href="/assets/images/fsf-logo-notext-large.webp"
          as="image"
        />
      </Helmet>
      <HomePageWrapper>
        <Hero />

        <LazySection
          importFunc={() => import("./IntroSection/IntroSection")}
          fallback={<LoadingSpinner />}
          rootMargin="100px"
          threshold={0.1}
          className="intro-section"
        />
        <LazySection
          importFunc={() => import("./InfoSection/InfoSection")}
          fallback={<LoadingSpinner />}
          rootMargin="100px"
          threshold={0.1}
          className="info-section"
        />
        <LazySection
          importFunc={() => import("./ProductsAndServices/ProductsAndServices")}
          fallback={<LoadingSpinner />}
          rootMargin="100px"
          threshold={0.1}
          className="products-section"
        />
        <LazySection
          importFunc={() => import("./CTASection/CTASection")}
          fallback={<LoadingSpinner />}
          rootMargin="100px"
          threshold={0.1}
          className="cta-section"
        />
      </HomePageWrapper>
    </>
  );
};

export default HomePage;

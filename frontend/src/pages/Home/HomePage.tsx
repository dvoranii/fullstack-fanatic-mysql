import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { HomePageWrapper } from "./HomePage.styled";
import Hero from "./Hero/Hero";
import React from "react";

const IntroSection = React.lazy(() => import("./IntroSection/IntroSection"));
const InfoSection = React.lazy(() => import("./InfoSection/InfoSection"));
const ProductsAndServices = React.lazy(
  () => import("./ProductsAndServices/ProductsAndServices")
);
const CTASection = React.lazy(() => import("./CTASection/CTASection"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <IntroSection />
          <InfoSection />
          <ProductsAndServices />
          <CTASection />
        </Suspense>
      </HomePageWrapper>
    </>
  );
};

export default HomePage;

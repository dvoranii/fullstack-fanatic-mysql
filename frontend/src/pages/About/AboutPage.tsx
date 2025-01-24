import { Helmet } from "react-helmet-async";
import {
  AboutIntroWrapperOuter,
  AboutIntroWrapper,
  AboutImageWrapper,
  MissionStatementWrapper,
  LinkWrapper,
  ImgWrapper,
} from "./AboutPage.styled";
import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";
import LazySection from "../../components/LazyLoad/LazySection/LazySection";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const AboutPage: React.FC = () => {
  const [coreTenetsVisible, setCoreTenetsVisible] = useState(false);

  const setVisible = (isVisible: boolean) => {
    setCoreTenetsVisible(isVisible);
  };

  return (
    <>
      <Helmet>
        <title>About - Full Stack Fanatic</title>
        <meta
          name="description"
          content="Empowering and educating IT specialists with unique and unconventional tactics by leveraging insider knowledge to fast-track success while fostering the mastery of core fundamentals through hands-on development and study."
        />
        <link
          rel="preload"
          href="/assets/images/Amico-images/About-us-page-amico.svg"
          as="image"
        />
        <link
          rel="preload"
          href="/assets/images/bg-images/Ellipse-bg.svg"
          as="image"
        />
        <link
          rel="preload"
          href="/assets/images/bg-images/Ellipse-bg-solid.svg"
          as="image"
        />
        <link
          rel="preload"
          href="/assets/images/bg-images/SquaresAndTriangles.svg"
          as="image"
        />
      </Helmet>

      <Title textContent="About" />
      <AboutIntroWrapperOuter>
        <AboutIntroWrapper>
          <AboutImageWrapper>
            <img
              src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/Amico-images/About-us-page-amico.svg"
              alt="about image"
              width="368"
              height="368"
            />
          </AboutImageWrapper>

          <MissionStatementWrapper>
            <h2>Our Mission Statement</h2>
            <p>
              Empowering and educating IT specialists with unique and
              unconventional tactics by leveraging insider knowledge to
              fast-track success while fostering the mastery of core
              fundamentals through hands-on development and study.
            </p>
            <LinkWrapper>
              <Link to="/plans-and-pricing">Join Us</Link>
            </LinkWrapper>
          </MissionStatementWrapper>
        </AboutIntroWrapper>
        <ImgWrapper>
          <img
            src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/bg-images/Ellipse-bg.svg"
            className="elipse"
            alt="elipse background image"
          />
        </ImgWrapper>
        <ImgWrapper>
          <img
            src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/bg-images/SquaresAndTriangles.svg"
            className="squares-triangle"
            alt="squares and triangles background image"
          />
        </ImgWrapper>
      </AboutIntroWrapperOuter>
      <LazySection
        importFunc={() => import("./CoreTenets/CoreTenets")}
        fallback={<LoadingSpinner />}
        rootMargin="0px"
        isVisible={coreTenetsVisible}
        onVisibilityChange={setVisible}
      />
    </>
  );
};

export default AboutPage;

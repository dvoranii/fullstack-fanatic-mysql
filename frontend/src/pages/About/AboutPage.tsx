import { Helmet } from "react-helmet-async";
import {
  AboutIntroWrapperOuter,
  AboutIntroWrapper,
  AboutImageWrapper,
  MissionStatementWrapper,
  CoreTenetsWrapper,
  CoreTenetsWrapperInner,
  TenetListSection,
  TenetLisItemTitle,
  ListSectionTitleWrapper,
  LinkWrapper,
  ImgWrapper,
  AboutPageWrapper,
  SubtitleWrapper,
  CTABtnWrapper,
} from "./AboutPage.styled";
import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";

const AboutPage: React.FC = () => {
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
      <AboutPageWrapper>
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
        <CoreTenetsWrapper>
          <SubtitleWrapper>
            <h3>
              At Full Stack Fanatic, we strive to live up to a set of core
              <br></br>
              tenets, and hopefully help you do the same
            </h3>
          </SubtitleWrapper>

          <CoreTenetsWrapperInner>
            <TenetListSection>
              <ListSectionTitleWrapper>
                <h4>What&nbsp;We're&nbsp;About</h4>
              </ListSectionTitleWrapper>
              <ol>
                <li>
                  <TenetLisItemTitle>Absolute Transparency</TenetLisItemTitle>
                  <div>
                    We are committed to exposing industry dark patterns and
                    advocating for ethical business practices. Our goal is not
                    just to avoid sleazy practices ourselves but to educate our
                    users on how to recognize and overcome them.
                  </div>
                </li>
                <li>
                  <TenetLisItemTitle>
                    Affordability and Flexibility
                  </TenetLisItemTitle>

                  <div>
                    Quality education should be accessible to everyone. That’s
                    why we offer affordable subscriptions, diverse access
                    options for premium content, and valuable free resources to
                    ensure everyone can grow their skills at their own pace.
                  </div>
                </li>
                <li>
                  <TenetLisItemTitle>
                    Fostering Collaboration and Networking
                  </TenetLisItemTitle>

                  <div>
                    Learning is better together. Fullstack Fanatic provides a
                    community where users can connect, collaborate, and support
                    one another, creating a network of driven professionals who
                    uplift each other.
                  </div>
                </li>
                <li>
                  <TenetLisItemTitle>
                    Revealing Insider Hacks and Game-Changing Tips
                  </TenetLisItemTitle>

                  <div>
                    We equip you with resourceful, under-the-radar strategies to
                    "game the system" and maximize efficiency—whether it’s
                    finding powerful free tools, uncovering design shortcuts, or
                    adopting techniques that give you a competitive edge.
                  </div>
                </li>
              </ol>
            </TenetListSection>
            <TenetListSection>
              <ListSectionTitleWrapper width="150px">
                <h4>What&nbsp;You&nbsp;Can&nbsp;Do&nbsp;to&nbsp;Succeed</h4>
              </ListSectionTitleWrapper>
              <ol>
                <li>
                  <TenetLisItemTitle>
                    Take Pride in Quality Work
                  </TenetLisItemTitle>

                  <div>
                    Strive for excellence in everything you create, delivering
                    your work with care, research, and attention to detail.
                    Becoming an expert means pushing yourself to go above and
                    beyond to make an impact.
                  </div>
                </li>
                <li>
                  <TenetLisItemTitle>
                    Cultivate Emotional Regulation and Resilience
                  </TenetLisItemTitle>

                  <div>
                    Programming and IT require patience and perseverance.
                    Embrace the challenges, develop strategies to manage
                    frustration, and grow through every obstacle you encounter.
                    This journey is as much about personal growth as it is about
                    technical skill.
                  </div>
                </li>
                <li>
                  <TenetLisItemTitle>Adopt a Growth Mindset</TenetLisItemTitle>

                  <div>
                    Continuously seek to improve, stay curious, and embrace
                    lifelong learning. Whether you’re just starting out or a
                    seasoned developer, there’s always more to learn and
                    opportunities to refine your craft.
                  </div>
                </li>
                <li>
                  <TenetLisItemTitle>
                    Think Ethically and Act Purposefully
                  </TenetLisItemTitle>

                  <div>
                    Let your work reflect integrity and purpose. Whether you're
                    designing websites, writing code, or securing systems, make
                    decisions that align with values of honesty, accessibility,
                    and inclusivity.
                  </div>
                </li>
              </ol>
            </TenetListSection>
          </CoreTenetsWrapperInner>
          <img
            src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/bg-images/Ellipse-bg-solid.svg"
            className="elipse-solid"
            alt="elipse background image"
          />
          <CTABtnWrapper>
            <Link to="/plans-and-pricing">Get Started</Link>
          </CTABtnWrapper>
        </CoreTenetsWrapper>
      </AboutPageWrapper>
    </>
  );
};

export default AboutPage;

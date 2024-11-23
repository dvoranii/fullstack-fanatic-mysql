import {
  AboutIntroWrapper,
  AboutImageWrapper,
  MissionStatementWrapper,
  CoreTenetsWrapper,
  CoreTenetsWrapperInner,
  WhatWeDoWrapper,
  WhatWeWantYouToDoWrapper,
} from "./AboutPage.styled";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../PageWrapper.styled";
import AboutImage from "../../assets/images/Amico-images/About-us-page-amico.svg";

const AboutPage: React.FC = () => {
  return (
    <PageWrapper>
      <Title textContent="About" />
      <AboutIntroWrapper>
        <AboutImageWrapper>
          <img src={AboutImage} alt="" />
        </AboutImageWrapper>

        <MissionStatementWrapper>
          <h2>Our Mission Statement</h2>
          <p>
            Empowering and educating IT specialists with unique and
            unconventional tactics by leveraging insider knowledge to fast-track
            success while fostering the mastery of core fundamentals through
            hands-on development.
          </p>
        </MissionStatementWrapper>
      </AboutIntroWrapper>
      <CoreTenetsWrapper>
        <p>
          At Full Stack Fanatic, we strive to live up to a set of core tenets,
          <br></br>
          and hopefully help you do the same:
        </p>
        <CoreTenetsWrapperInner>
          <WhatWeDoWrapper>
            <h3>What We Do</h3>
            <ul>
              <ol>
                <b>1.</b> <u>Absolute Transparency </u>
                <br></br>
                We are committed to exposing industry dark patterns and
                advocating for ethical business practices. Our goal is not just
                to avoid sleazy practices ourselves but to educate our users on
                how to recognize and overcome them.
              </ol>
              <ol>
                <b>2.</b> <u>Affordability and Flexibility</u>
                <br></br>
                Quality education should be accessible to everyone. That’s why
                we offer affordable subscriptions, diverse access options for
                premium content, and valuable free resources to ensure everyone
                can grow their skills at their own pace.
              </ol>
              <ol>
                <b>3.</b> <u>Fostering Collaboration and Networking</u>
                <br></br>
                Learning is better together. Fullstack Fanatic provides a
                community where users can connect, collaborate, and support one
                another, creating a network of driven professionals who uplift
                each other.
              </ol>
              <ol>
                <b>4.</b> <u>Revealing Insider Hacks and Game-Changing Tips</u>
                <br />
                We equip you with resourceful, under-the-radar strategies to
                "game the system" and maximize efficiency—whether it’s finding
                powerful free tools, uncovering design shortcuts, or adopting
                techniques that give you a competitive edge.
              </ol>
            </ul>
          </WhatWeDoWrapper>
          <WhatWeWantYouToDoWrapper>
            <h3>What We Want You to Do</h3>
            <ul>
              <ol>
                <b>1.</b> <u>Take Pride in Quality Work </u>
                <br></br>
                Strive for excellence in everything you create, delivering your
                work with care, research, and attention to detail. Becoming an
                expert means pushing yourself to go above and beyond to make an
                impact.
              </ol>
              <ol>
                <b>2.</b> <u>Cultivate Emotional Regulation and Resilience</u>
                <br></br>
                Quality education should be accessible to everyone. That’s why
                Programming and IT require patience and perseverance. Embrace
                the challenges, develop strategies to manage frustration, and
                grow through every obstacle you encounter. This journey is as
                much about personal growth as it is about technical skill.
              </ol>
              <ol>
                <b>3.</b> <u>Adopt a Growth Mindset</u>
                <br></br>
                Continuously seek to improve, stay curious, and embrace lifelong
                learning. Whether you’re just starting out or a seasoned
                developer, there’s always more to learn and opportunities to
                refine your craft.
              </ol>
              <ol>
                <b>4.</b> <u>Think Ethically and Act Purposefully</u>
                <br />
                Let your work reflect integrity and purpose. Whether you're
                designing websites, writing code, or securing systems, make
                decisions that align with values of honesty, accessibility, and
                inclusivity.{" "}
              </ol>
            </ul>
          </WhatWeWantYouToDoWrapper>
        </CoreTenetsWrapperInner>
      </CoreTenetsWrapper>
    </PageWrapper>
  );
};

export default AboutPage;

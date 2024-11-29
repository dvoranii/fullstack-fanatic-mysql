import { Helmet } from "react-helmet";
import {
  PrivacyPolicyContainer,
  Header,
  Section,
  SectionTitle,
  Paragraph,
} from "./PrivacyPolicy.styled";
import TitleBanner from "../../components/TitleBanner/TitleBanner";
import { PageWrapper } from "../../PageWrapper.styled";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Full Stack Fanatic</title>
        <meta
          name="description"
          content="This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website."
        />
      </Helmet>
      <TitleBanner textContent={"Privacy Policy"} />
      <PageWrapper>
        <PrivacyPolicyContainer>
          <Header>Privacy Policy</Header>
          <Section>
            <SectionTitle>1. Introduction</SectionTitle>
            <Paragraph>
              This Privacy Policy explains how we collect, use, disclose, and
              protect your information when you use our website.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>2. Information We Collect</SectionTitle>
            <Paragraph>
              We collect information that you provide directly to us, such as
              when you register for an account, subscribe to our newsletter, or
              contact support.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>3. How We Use Your Information</SectionTitle>
            <Paragraph>
              We use the information we collect to provide, maintain, and
              improve our services, as well as to communicate with you.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>4. Sharing Your Information</SectionTitle>
            <Paragraph>
              We do not share your personal information with third parties
              except as necessary to provide our services or comply with legal
              obligations.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>5. Your Rights</SectionTitle>
            <Paragraph>
              You have the right to access, update, or delete your personal
              information. Please contact us if you wish to exercise these
              rights.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>6. Contact Us</SectionTitle>
            <Paragraph>
              If you have any questions about this Privacy Policy, please
              contact us at support@example.com.
            </Paragraph>
          </Section>
        </PrivacyPolicyContainer>
      </PageWrapper>
    </>
  );
};

export default PrivacyPolicy;

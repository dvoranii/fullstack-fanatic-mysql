import { Helmet } from "react-helmet-async";
import {
  TermsContainer,
  Header,
  Section,
  SectionTitle,
  Paragraph,
} from "./TermsAndConditions.styled";
import { PageWrapper } from "../../PageWrapper.styled";
import TitleBanner from "../../components/TitleBanner/TitleBanner";

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Full Stack Fanatic</title>
        <meta
          name="description"
          content="These Terms and Conditions govern your use of our website. By accessing or using our site, you agree to comply with and be bound by these terms."
        />
      </Helmet>
      <TitleBanner textContent={"Terms & Conditions"} />
      <PageWrapper>
        <TermsContainer>
          <Header>Terms and Conditions</Header>
          <Section>
            <SectionTitle>1. Introduction</SectionTitle>
            <Paragraph>
              These Terms and Conditions govern your use of our website. By
              accessing or using our site, you agree to comply with and be bound
              by these terms.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>2. Use of the Website</SectionTitle>
            <Paragraph>
              You agree to use the website only for lawful purposes and in a way
              that does not infringe the rights of others or restrict their use
              of the site.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>3. User Accounts</SectionTitle>
            <Paragraph>
              You are responsible for maintaining the confidentiality of your
              account information and for all activities that occur under your
              account.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>4. Intellectual Property</SectionTitle>
            <Paragraph>
              All content on this website, including text, graphics, logos, and
              images, is the property of our company or its content suppliers
              and is protected by copyright laws.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>5. Limitation of Liability</SectionTitle>
            <Paragraph>
              We are not liable for any damages arising from your use of this
              website. This includes any direct, indirect, incidental, or
              consequential damages.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>6. Changes to Terms</SectionTitle>
            <Paragraph>
              We reserve the right to modify these Terms and Conditions at any
              time. Any changes will be posted on this page, and it is your
              responsibility to review them periodically.
            </Paragraph>
          </Section>
          <Section>
            <SectionTitle>7. Contact Us</SectionTitle>
            <Paragraph>
              If you have any questions about these Terms and Conditions, please
              contact us at support@example.com.
            </Paragraph>
          </Section>
        </TermsContainer>
      </PageWrapper>
      <div>&nbsp;</div>
    </>
  );
};

export default TermsAndConditions;

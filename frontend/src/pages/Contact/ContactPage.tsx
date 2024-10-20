import React from "react";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../PageWrapper.styled";
const ContactPage: React.FC = () => {
  return (
    <PageWrapper>
      <Title textContent="Contact" pseudoRight="5px" />
    </PageWrapper>
  );
};

export default ContactPage;

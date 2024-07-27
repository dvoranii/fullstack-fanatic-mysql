import React from "react";
import Title from "../../components/Title/Title";
import { ContactPageWrapper } from "./ContactPage.styled";

const ContactPage: React.FC = () => {
  return (
    <ContactPageWrapper>
      <Title textContent="Contact" />
    </ContactPageWrapper>
  );
};

export default ContactPage;

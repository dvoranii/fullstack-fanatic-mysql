import { ContactPageWrapper, ImgWrapper } from "./ContactPage.styled";
import Title from "../../components/Title/Title";
import ElipseBgWhite from "../../assets/images/Ellipse-bg-white.svg";
import ContactForm from "./ContactForm/ContactForm";
import OrangeTriangle from "../../assets/images/orange-triangle.svg";

const ContactPage: React.FC = () => {
  return (
    <ContactPageWrapper>
      <Title
        textContent="Contact Us"
        pseudoWidth="140px"
        pseudoColor="#E5E5E5"
        textColor="#14213D"
        fontWeight={700}
      />
      <ContactForm />

      <ImgWrapper>
        <img
          src={ElipseBgWhite}
          alt="Elipse background image"
          className="elipse"
          loading="lazy"
        />
      </ImgWrapper>
      <ImgWrapper>
        <img
          src={OrangeTriangle}
          alt="Triangle background image"
          className="triangle"
          loading="lazy"
        />
      </ImgWrapper>
    </ContactPageWrapper>
  );
};

export default ContactPage;

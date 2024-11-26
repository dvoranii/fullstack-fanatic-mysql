import {
  FormWrapper,
  InputField,
  TextArea,
  SubmitButton,
  NameEmailWrapper,
} from "./ContactForm.styled";

const ContactForm: React.FC = () => {
  return (
    <FormWrapper>
      <NameEmailWrapper>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <InputField type="text" id="fullName" placeholder="Your name here" />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <InputField type="email" id="email" placeholder="john@email.com" />
        </div>
      </NameEmailWrapper>

      <div>
        <label htmlFor="message">Message</label>
        <TextArea id="message" placeholder="Type your message" />
      </div>
      <SubmitButton type="submit">Send</SubmitButton>
    </FormWrapper>
  );
};

export default ContactForm;

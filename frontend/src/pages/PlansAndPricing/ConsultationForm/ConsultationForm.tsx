import { useState } from "react";
import {
  ConsultationFormWrapper,
  NameWrapper,
  EmailWrapper,
  TextAreaWrapper,
  UserInfoWrapper,
  ConsultationFormWrapperOuter,
  SubmitBtnWrapper,
  FormComponentContainer,
} from "./ConsultationForm.styled";
import SwooshBG from "../../../assets/images/plansAndPricing/pink-swoosh.png";
import ErrorMessage from "../../../components/Form/ErrorMessage";
import { submitConsultationForm } from "../../../services/consultFormService";

const ConsultationForm: React.FC<{
  formRef: React.RefObject<HTMLDivElement>;
}> = ({ formRef }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setNameError(null);
    setEmailError(null);
    setMessageError(null);

    let hasError = false;

    if (!name) {
      setNameError("Please enter your name");
      hasError = true;
    }
    if (!email) {
      setEmailError("Please enter your email");
      hasError = true;
    } else if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email (i.e., 123@abc.com)");
      hasError = true;
    }
    if (!message) {
      setMessageError("Please enter your message");
    }

    if (hasError) return;

    try {
      const response = await submitConsultationForm(name, email, message);
      console.log("Form submitted:", response.data.message);
      alert("Thank you for submitting the form. We will contact you soon.");
    } catch (error) {
      console.error("Error submitting the consultation form:", error);
      alert("There was an issue submitting the form. Please try again.");
    }
  };

  const handleOnChangeInputText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "name" && nameError !== null) {
      setNameError(null);
    }
    if (name === "email" && emailError !== null) {
      setEmailError(null);
    }
    if (name === "message" && messageError !== null) {
      setMessageError(null);
    }

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  return (
    <FormComponentContainer ref={formRef}>
      <img src={SwooshBG} className="swoosh-bg" alt="" />
      <ConsultationFormWrapperOuter>
        <ConsultationFormWrapper>
          <form onSubmit={handleSubmit}>
            <UserInfoWrapper>
              <NameWrapper>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleOnChangeInputText}
                />
                <ErrorMessage
                  error={nameError}
                  textAlign="left"
                  fontSize="0.8rem"
                  marginTop="4px"
                />
              </NameWrapper>
              <EmailWrapper>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleOnChangeInputText}
                />
                <ErrorMessage
                  error={emailError}
                  textAlign="left"
                  fontSize="0.8rem"
                  marginTop="4px"
                />
              </EmailWrapper>
            </UserInfoWrapper>

            <TextAreaWrapper>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={handleOnChangeInputText}
              ></textarea>
              <ErrorMessage
                error={messageError}
                textAlign="left"
                fontSize="0.8rem"
                marginTop="4px"
              />
            </TextAreaWrapper>
            <SubmitBtnWrapper>
              <button type="submit">Submit</button>
            </SubmitBtnWrapper>
          </form>
        </ConsultationFormWrapper>
      </ConsultationFormWrapperOuter>
    </FormComponentContainer>
  );
};

export default ConsultationForm;

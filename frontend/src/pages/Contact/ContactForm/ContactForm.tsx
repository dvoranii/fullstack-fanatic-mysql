import { useState } from "react";
import {
  FormWrapper,
  InputField,
  TextArea,
  SubmitButton,
  NameEmailWrapper,
  SpinnerWrapper,
} from "./ContactForm.styled";
import { validateField } from "../../../utils/validationUtils";
import FormMessage from "../../../components/Form/Message";
import { submitContactForm } from "../../../services/contactFormService";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useCsrfToken } from "../../../hooks/useCsrfToken";
import useReCaptcha from "../../../hooks/useRecaptcha";

const ContactForm: React.FC = () => {
  const { getReCaptchaToken } = useReCaptcha();
  const csrfToken = useCsrfToken();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullName: null as string | null,
    email: null as string | null,
    message: null as string | null,
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      fullName: validateField({
        type: "username",
        value: formData.fullName,
      }),
      email: validateField({
        type: "email",
        value: formData.email,
      }),
      message: formData.message ? null : "Please enter your message",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error !== null);
    if (hasError) return;

    setIsLoading(true);

    try {
      const recaptchaToken = await getReCaptchaToken("contact_form");

      await submitContactForm(
        formData.fullName,
        formData.email,
        formData.message,
        csrfToken,
        recaptchaToken
      );

      setSuccessMessage("Your message has been sent!");
      setTimeout(() => setSuccessMessage(null), 5000);

      setFormData({
        fullName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting the contact form:", error);
      setErrors((prev) => ({
        ...prev,
        message: "There was an issue submitting the form. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit} noValidate>
      <NameEmailWrapper>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <InputField
            type="text"
            id="fullName"
            placeholder="Your name here"
            value={formData.fullName}
            onChange={handleOnChange}
          />
          <FormMessage
            message={errors.fullName}
            type="error"
            textAlign="left"
            fontSize="0.8rem"
            marginTop="4px"
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <InputField
            type="email"
            id="email"
            placeholder="abc@email.com"
            value={formData.email}
            onChange={handleOnChange}
          />
          <FormMessage
            message={errors.email}
            type="error"
            textAlign="left"
            fontSize="0.8rem"
            marginTop="4px"
          />
        </div>
      </NameEmailWrapper>

      <div>
        <label htmlFor="message">Message</label>
        <TextArea
          id="message"
          placeholder="Type your message"
          value={formData.message}
          onChange={handleOnChange}
        />
        <FormMessage
          message={errors.message}
          type="error"
          textAlign="left"
          fontSize="0.8rem"
          marginTop="4px"
        />
      </div>

      {isLoading ? (
        <SpinnerWrapper>
          <LoadingSpinner />
        </SpinnerWrapper>
      ) : (
        <SubmitButton type="submit" disabled={isLoading}>
          Send
        </SubmitButton>
      )}

      <FormMessage
        message={successMessage}
        type="success"
        textAlign="center"
        fontSize="1rem"
        marginTop="10px"
      />
    </FormWrapper>
  );
};

export default ContactForm;

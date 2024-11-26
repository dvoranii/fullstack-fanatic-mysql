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
import FormMessage from "../../../components/Form/Message";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { submitConsultationForm } from "../../../services/consultFormService";
import { validateField } from "../../../utils/validationUtils";

const ConsultationForm: React.FC<{
  formRef: React.RefObject<HTMLDivElement>;
}> = ({ formRef }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: null as string | null,
    email: null as string | null,
    message: null as string | null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: validateField({ type: "username", value: formData.name }),
      email: validateField({ type: "email", value: formData.email }),
      message: formData.message ? null : "Please enter your message",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error !== null);
    if (hasError) return;

    setIsLoading(true);

    try {
      await submitConsultationForm(
        formData.name,
        formData.email,
        formData.message
      );
      setSuccessMessage("Form submission successful!");

      setTimeout(() => {
        setSuccessMessage(null);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }, 5000);
    } catch (error) {
      console.error("Error submitting the consultation form:", error);
      setErrors((prev) => ({
        ...prev,
        message: "There was an issue submitting the form. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChangeInputText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
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
                  value={formData.name}
                  onChange={handleOnChangeInputText}
                />
                <FormMessage
                  message={errors.name}
                  type="error"
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
                  value={formData.email}
                  onChange={handleOnChangeInputText}
                />
                <FormMessage
                  message={errors.email}
                  type="error"
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
                value={formData.message}
                onChange={handleOnChangeInputText}
              ></textarea>
              <FormMessage
                message={errors.message}
                type="error"
                textAlign="left"
                fontSize="0.8rem"
                marginTop="4px"
              />
            </TextAreaWrapper>
            <SubmitBtnWrapper>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <button type="submit">Submit</button>
              )}
            </SubmitBtnWrapper>

            <FormMessage
              message={successMessage}
              type="success"
              textAlign="center"
              fontSize="1rem"
              marginTop="10px"
            />
          </form>
        </ConsultationFormWrapper>
      </ConsultationFormWrapperOuter>
      <div>&nbsp;</div>
    </FormComponentContainer>
  );
};

export default ConsultationForm;

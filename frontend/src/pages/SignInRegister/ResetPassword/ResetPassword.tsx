import { useState } from "react";
import { PageWrapper } from "../../../PageWrapper.styled";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../services/passwordService";
import { sanitizeInput } from "../../../utils/sanitizationUtils";
import { validateField } from "../../../utils/validationUtils";
import {
  ResetPasswordWrapper,
  Title,
  Form,
  InputWrapper,
  Label,
  Input,
  SubmitButton,
  ButtonWrapper,
} from "./ResetPassword.styled";
import FormMessage from "../../../components/Form/Message";
import { useCsrfToken } from "../../../hooks/useCsrfToken";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useReCaptcha from "../../../hooks/useReCaptcha";

const ResetPassword = () => {
  const { getReCaptchaToken } = useReCaptcha();
  const csrfToken = useCsrfToken();
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedConfirmPassword = sanitizeInput(confirmPassword);

    const passwordError = validateField({
      type: "password",
      value: sanitizedPassword,
    });

    const confirmPasswordError = validateField({
      type: "confirmPassword",
      value: sanitizedConfirmPassword,
      compareValue: sanitizedPassword,
    });

    if (passwordError || confirmPasswordError) {
      setMessage(passwordError || confirmPasswordError);
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const recaptchaToken = await getReCaptchaToken("reset_password_form");
      await resetPassword(token!, sanitizedPassword, csrfToken, recaptchaToken);
      setMessage("Password successfully reset. Redirecting to login...");
      setMessageType("success");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setMessage("Failed to reset password. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <ResetPasswordWrapper>
        <Title>Reset Password</Title>
        <Form onSubmit={handleSubmit} noValidate>
          <InputWrapper>
            <Label htmlFor="password">New Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="confirm-password">Confirm New Password:</Label>
            <Input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </InputWrapper>
          <ButtonWrapper>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <SubmitButton type="submit">Reset Password</SubmitButton>
            )}
          </ButtonWrapper>
        </Form>
        {message && (
          <FormMessage
            message={message}
            type={messageType}
            textAlign="center"
            fontSize="1rem"
            marginTop="20px"
          />
        )}
      </ResetPasswordWrapper>
    </PageWrapper>
  );
};

export default ResetPassword;

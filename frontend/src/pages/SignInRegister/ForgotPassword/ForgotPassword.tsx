import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../services/passwordService";
import {
  ForgotPasswordWrapper,
  Title,
  Form,
  InputWrapper,
  Label,
  Input,
  SubmitButton,
  ButtonWrapper,
} from "./ForgotPassword.styled";
import { PageWrapper } from "../../../PageWrapper.styled";
import FormMessage from "../../../components/Form/Message";
import { useCsrfToken } from "../../../hooks/useCsrfToken";
import { getAuthTypeByEmail } from "../../../services/passwordService";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const ForgotPassword = () => {
  const csrfToken = useCsrfToken();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const authType = await getAuthTypeByEmail(email);

      if (authType === "google") {
        setMessage(
          "This account is registered via Google Sign-In and cannot have its password changed."
        );
        setMessageType("error");
        return;
      }

      await forgotPassword(email, csrfToken);
      setMessage("Password reset link has been sent to your email.");
      setMessageType("success");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setMessage("Failed to process request. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <ForgotPasswordWrapper>
        <Title>Forgot Password?</Title>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Label htmlFor="email">Enter your registered email address:</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </InputWrapper>
          <ButtonWrapper>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <SubmitButton type="submit">Send Reset Link</SubmitButton>
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
      </ForgotPasswordWrapper>
    </PageWrapper>
  );
};

export default ForgotPassword;

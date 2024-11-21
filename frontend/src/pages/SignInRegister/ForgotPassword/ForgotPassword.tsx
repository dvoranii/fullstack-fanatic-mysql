import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../api/api";
import {
  ForgotPasswordWrapper,
  Title,
  Form,
  InputWrapper,
  Label,
  Input,
  SubmitButton,
} from "./ForgotPassword.styled";
import { PageWrapper } from "../../../PageWrapper.styled";
import FormMessage from "../../../components/Form/Message";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage("Password reset link has been sent to your email.");
      setMessageType("success");
      // Optionally navigate after some time
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setMessage("Failed to send reset link. Please try again.");
      setMessageType("error");
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
            />
          </InputWrapper>
          <SubmitButton type="submit">Send Reset Link</SubmitButton>
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

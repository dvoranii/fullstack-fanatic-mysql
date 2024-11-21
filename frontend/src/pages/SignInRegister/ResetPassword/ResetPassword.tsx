import { useState } from "react";
import { PageWrapper } from "../../../PageWrapper.styled";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../services/passwordService";
import {
  ResetPasswordWrapper,
  Title,
  Form,
  InputWrapper,
  Label,
  Input,
  SubmitButton,
} from "./ResetPassword.styled";
import FormMessage from "../../../components/Form/Message";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }
    try {
      await resetPassword(token!, password);
      setMessage("Password successfully reset. Redirecting to login...");
      setMessageType("success");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setMessage("Failed to reset password. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <PageWrapper>
      <ResetPasswordWrapper>
        <Title>Reset Password</Title>
        <Form onSubmit={handleSubmit}>
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
          <SubmitButton type="submit">Reset Password</SubmitButton>
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

import { useGoogleLogin } from "@react-oauth/google";
import { useAuthForm } from "../../hooks/useAuthForm";
import InputField from "../Form/InputField";
import GoogleAuthButton from "../Form/GoogleAuthButton";
import SubmitButton from "../Form/SubmitButton";
import FormMessage from "../Form/Message";
import TermsCheckbox from "../Form/TermsCheckbox";
import {
  RegisterLoginFormWrapperInner,
  RegisterLoginFormOuter,
  Form,
  RegisterFormWrapperInner,
  LoginFormWrapperOuter,
  LoginFormWrapperInner,
  RegisterFormTitleWrapper,
  LoginFormTitleWrapper,
  Divider,
  FormTitle,
  ForgotPasswordLink,
  ForgotPasswordLinkWrapper,
  BtnWrapper,
} from "./RegisterLoginForm.styled";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface RegisterLoginFormProps {
  defaultToLogin?: boolean;
}

const RegisterLoginForm: React.FC<RegisterLoginFormProps> = ({
  defaultToLogin = false,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    isLogin,
    error,
    toggleForm,
    handleGoogleRegister,
    handleGoogleLogin,
    handleRegisterSubmit,
    handleLoginSubmit,
    setError,
    isTermsAccepted,
    setIsTermsAccepted,
  } = useAuthForm(defaultToLogin);

  const handleGoogleRegisterClick = useGoogleLogin({
    onSuccess: handleGoogleRegister,
    onError: (error) => {
      setError("Google authentication failed");
      console.log(error);
    },
  });

  const handleGoogleLoginClick = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: (error) => {
      setError("Google authentication failed");
      console.log(error);
    },
  });

  const handleGoogleRegisterButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setError(null);

    if (!isTermsAccepted) {
      setError("Please accept the terms and conditions");
      return;
    }

    handleGoogleRegisterClick();
  };

  const handleGoogleLoginButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setError(null);

    handleGoogleLoginClick();
  };

  const handleSubmitWithSpinner = async (
    submitFn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await submitFn(e);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <RegisterLoginFormOuter>
      <RegisterLoginFormWrapperInner $isLogin={isLogin}>
        <Form
          onSubmit={(e) => handleSubmitWithSpinner(handleRegisterSubmit, e)}
          noValidate
        >
          <RegisterFormWrapperInner>
            <RegisterFormTitleWrapper
              $isLogin={isLogin}
              onClick={isLogin ? toggleForm : undefined}
            >
              <FormTitle $isLogin={isLogin}>Register</FormTitle>
            </RegisterFormTitleWrapper>
            <InputField
              label="Username"
              type="text"
              id="username"
              placeholder="Enter a username"
            />
            <InputField
              label="Email"
              type="email"
              id="email"
              placeholder="abc@email.com"
            />
            <InputField
              label="Password"
              type="password"
              id="password"
              placeholder="*****"
            />
            <InputField
              label="Confirm Password"
              type="password"
              id="confirm-password"
              placeholder="*****"
            />
            <TermsCheckbox
              isChecked={isTermsAccepted}
              onChange={setIsTermsAccepted}
            />
            <BtnWrapper>
              {loading ? <LoadingSpinner /> : <SubmitButton text="Register" />}
            </BtnWrapper>

            <FormMessage message={error} type="error" />
            <Divider>OR</Divider>
            <GoogleAuthButton
              handleClick={handleGoogleRegisterButtonClick}
              text="Register with Google"
            />
          </RegisterFormWrapperInner>
        </Form>

        <LoginFormWrapperOuter $isLogin={isLogin}>
          <LoginFormTitleWrapper $isLogin={isLogin} onClick={toggleForm}>
            <FormTitle $isLogin={isLogin}>Login</FormTitle>
          </LoginFormTitleWrapper>
          <LoginFormWrapperInner>
            <Form
              onSubmit={(e) => handleSubmitWithSpinner(handleLoginSubmit, e)}
              noValidate
            >
              <InputField
                label="Username"
                type="text"
                id="login-username"
                placeholder="Username"
              />
              <InputField
                label="Password"
                type="password"
                id="login-password"
                placeholder="*****"
              />
              <BtnWrapper>
                {loading ? <LoadingSpinner /> : <SubmitButton text="Login" />}
              </BtnWrapper>

              <FormMessage message={error} type="error" />
              <ForgotPasswordLinkWrapper>
                <ForgotPasswordLink to="/forgot-password">
                  Forgot Password?
                </ForgotPasswordLink>
              </ForgotPasswordLinkWrapper>
              <Divider>OR</Divider>
              <GoogleAuthButton
                handleClick={handleGoogleLoginButtonClick}
                text="Sign in with Google"
              />
            </Form>
          </LoginFormWrapperInner>
        </LoginFormWrapperOuter>
      </RegisterLoginFormWrapperInner>
    </RegisterLoginFormOuter>
  );
};

export default RegisterLoginForm;

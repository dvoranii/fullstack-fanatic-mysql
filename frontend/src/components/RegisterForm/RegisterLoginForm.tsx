import { useGoogleLogin } from "@react-oauth/google";
import { useAuthForm } from "../../hooks/useAuthForm";
import InputField from "../Form/InputField";
import GoogleAuthButton from "../Form/GoogleAuthButton";
import SubmitButton from "../Form/SubmitButton";
import ErrorMessage from "../Form/Message";
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
} from "./RegisterLoginForm.styled";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface RegisterLoginFormProps {
  defaultToLogin?: boolean;
}

const RegisterLoginForm: React.FC<RegisterLoginFormProps> = ({
  defaultToLogin = false,
}) => {
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

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" && !isLogin) {
      toggleForm();
    } else if (location.pathname === "/register" && isLogin) {
      toggleForm();
    }
  }, [location, isLogin, toggleForm]);

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

  return (
    <RegisterLoginFormOuter>
      <RegisterLoginFormWrapperInner $isLogin={isLogin}>
        <Form onSubmit={handleRegisterSubmit} noValidate>
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
            <SubmitButton text="Register" />
            <ErrorMessage error={error} />
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
            <Form onSubmit={handleLoginSubmit}>
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
              <SubmitButton text="Login" />
              <ErrorMessage error={error} />
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

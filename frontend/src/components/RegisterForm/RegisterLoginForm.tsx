import React from "react";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthForm } from "../../hooks/useAuthForm";
import InputField from "../Form/InputField";
import GoogleAuthButton from "../Form/GoogleAuthButton";
import SubmitButton from "../Form/SubmitButton";
import ErrorMessage from "../Form/ErrorMessage";
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
  TermsWrapper,
} from "./RegisterLoginForm.styled";

const RegisterLoginForm: React.FC = () => {
  const {
    isLogin,
    error,
    toggleForm,
    handleGoogleAuthSuccess,
    handleGoogleAuthError,
    handleRegisterSubmit,
    handleLoginSubmit,
  } = useAuthForm();

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: handleGoogleAuthSuccess,
    onError: handleGoogleAuthError,
  });

  return (
    <RegisterLoginFormOuter>
      <RegisterLoginFormWrapperInner $isLogin={isLogin}>
        <Form onSubmit={(e) => handleRegisterSubmit(e, "form")}>
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
            <TermsWrapper>
              <input type="checkbox" id="terms-register" />
              <label htmlFor="terms-register">
                <span className="checkbox-label">I accept</span>
                <Link to="/terms-conditions" className="terms-link">
                  terms & conditions
                </Link>
              </label>
            </TermsWrapper>
            <SubmitButton
              onClick={(e) => handleRegisterSubmit(e, "button")}
              text="Register"
            />
            <ErrorMessage error={error} />
            <Divider>OR</Divider>
            <GoogleAuthButton
              handleGoogleAuth={handleGoogleAuth}
              text="Register with Google"
            />
          </RegisterFormWrapperInner>
        </Form>

        <LoginFormWrapperOuter $isLogin={isLogin}>
          <LoginFormTitleWrapper $isLogin={isLogin} onClick={toggleForm}>
            <FormTitle $isLogin={isLogin}>Login</FormTitle>
          </LoginFormTitleWrapper>
          <LoginFormWrapperInner>
            <Form onSubmit={(e) => handleLoginSubmit(e, "form")}>
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
              <SubmitButton
                onClick={(e) => handleLoginSubmit(e, "button")}
                text="Login"
              />
              <ErrorMessage error={error} />
              <Divider>OR</Divider>

              <GoogleAuthButton
                handleGoogleAuth={handleGoogleAuth}
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

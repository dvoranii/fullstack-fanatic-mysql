import React, { useState } from "react";
import {
  RegisterLoginFormWrapperInner,
  RegisterLoginFormOuter,
  Form,
  RegisterFormWrapperInner,
  RegisterFormTitleWrapper,
  Input,
  FormLabel,
  SubmitButton,
  TermsWrapper,
  FormTitle,
  LoginFormTitleWrapper,
  LoginFormWrapperOuter,
  LoginFormWrapperInner,
} from "./RegisterLoginForm.styled";

const RegisterLoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <RegisterLoginFormOuter>
      <RegisterLoginFormWrapperInner isLogin={isLogin}>
        <Form>
          <RegisterFormWrapperInner>
            <RegisterFormTitleWrapper
              isLogin={isLogin}
              onClick={isLogin ? toggleForm : undefined}
            >
              <FormTitle isLogin={isLogin}>Register</FormTitle>
            </RegisterFormTitleWrapper>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <Input type="text" id="username" placeholder="Enter a username" />
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input type="email" id="email" placeholder="abc@email.com" />
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input type="password" id="password" placeholder="*****" />
            <FormLabel htmlFor="password">Confirm Password:</FormLabel>
            <Input type="password" id="password" placeholder="*****" />
            {/* Or sign up with google */}
            <TermsWrapper>
              <input type="checkbox" id="terms-register" />
              <label htmlFor="terms-register">
                I accept the terms & conditions
              </label>
            </TermsWrapper>
            <SubmitButton>
              <span>Register</span>
            </SubmitButton>
          </RegisterFormWrapperInner>
        </Form>

        <LoginFormWrapperOuter isLogin={isLogin}>
          <LoginFormTitleWrapper isLogin={isLogin} onClick={toggleForm}>
            <FormTitle isLogin={isLogin}>Login</FormTitle>
          </LoginFormTitleWrapper>
          <LoginFormWrapperInner>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <Input type="text" placeholder="Username" />
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input type="password" placeholder="*****" />
            <TermsWrapper>
              <input type="checkbox" id="terms-login" />
              <label htmlFor="terms-login">
                I accept the terms & conditions
              </label>
            </TermsWrapper>
            <SubmitButton>
              <span>Login</span>
            </SubmitButton>
          </LoginFormWrapperInner>
        </LoginFormWrapperOuter>
      </RegisterLoginFormWrapperInner>
    </RegisterLoginFormOuter>
  );
};

export default RegisterLoginForm;

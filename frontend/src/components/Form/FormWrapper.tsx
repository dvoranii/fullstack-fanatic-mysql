import React from "react";
import {
  FormWrapperInner,
  FormTitleWrapper,
  FormTitle,
} from "./styles/FormWrapper.styled";

interface FormWrapperProps {
  isLogin: boolean;
  toggleForm: () => void;
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  isLogin,
  toggleForm,
  children,
}) => (
  <FormWrapperInner>
    <FormTitleWrapper $isLogin={isLogin} onClick={toggleForm}>
      <FormTitle $isLogin={isLogin}>{isLogin ? "Login" : "Register"}</FormTitle>
    </FormTitleWrapper>
    {children}
  </FormWrapperInner>
);

export default FormWrapper;

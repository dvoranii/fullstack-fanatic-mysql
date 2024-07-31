import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import { useUser } from "../../../context/UserContext";
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
  Divider,
  GoogleSignInButton,
} from "./RegisterLoginForm.styled";
import googleIcon from "../../../assets/images/google-signin-icon.png";

const RegisterLoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<TokenResponse | null>(null);
  const { setProfile } = useUser();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed: ", error),
  });

  useEffect(() => {
    if (user) {
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Google API Response:", data);
          setProfile({
            email: data.email,
            name: data.name,
            id: data.id,
            picture: data.picture,
          });
          navigate("/my-account");
        })
        .catch((err) => console.log(err));
    }
  }, [user, setProfile, navigate]);

  return (
    <RegisterLoginFormOuter>
      <RegisterLoginFormWrapperInner $isLogin={isLogin}>
        <Form>
          <RegisterFormWrapperInner>
            <RegisterFormTitleWrapper
              $isLogin={isLogin}
              onClick={isLogin ? toggleForm : undefined}
            >
              <FormTitle $isLogin={isLogin}>Register</FormTitle>
            </RegisterFormTitleWrapper>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <Input type="text" id="username" placeholder="Enter a username" />
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input type="email" id="email" placeholder="abc@email.com" />
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input type="password" id="password" placeholder="*****" />
            <FormLabel htmlFor="password">Confirm Password:</FormLabel>
            <Input type="password" id="password" placeholder="*****" />

            <TermsWrapper>
              <input type="checkbox" id="terms-register" />
              <label htmlFor="terms-register">
                <span className="checkbox-label">I accept</span>
                <Link to="/terms-conditions" className="terms-link">
                  terms & conditions
                </Link>
              </label>
            </TermsWrapper>
            <SubmitButton>
              <span>Register</span>
            </SubmitButton>
            <Divider>OR</Divider>
          </RegisterFormWrapperInner>
        </Form>

        <LoginFormWrapperOuter $isLogin={isLogin}>
          <LoginFormTitleWrapper $isLogin={isLogin} onClick={toggleForm}>
            <FormTitle $isLogin={isLogin}>Login</FormTitle>
          </LoginFormTitleWrapper>
          <LoginFormWrapperInner>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <Input type="text" placeholder="Username" />
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input type="password" placeholder="*****" />

            <SubmitButton>
              <span>Login</span>
            </SubmitButton>
            <Divider>OR</Divider>
          </LoginFormWrapperInner>
        </LoginFormWrapperOuter>

        <GoogleSignInButton onClick={() => login()}>
          <img src={googleIcon} alt="Google Icon" />
          <span>
            {isLogin ? "Sign in with Google" : "Register with Google"}
          </span>
        </GoogleSignInButton>
      </RegisterLoginFormWrapperInner>
    </RegisterLoginFormOuter>
  );
};

export default RegisterLoginForm;

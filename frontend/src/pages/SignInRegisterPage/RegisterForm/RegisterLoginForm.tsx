import React, { useState } from "react";
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
import { User } from "../../../types/User";

const RegisterLoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setProfile } = useUser();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (codeResponse: TokenResponse) => {
      console.log("Google auth successful, codeResponse:", codeResponse);
      try {
        const userInfo = await fetchGoogleUserInfo(codeResponse.access_token);
        if (isLogin) {
          await handleLogin(userInfo);
        } else {
          await handleRegistration(userInfo);
        }
      } catch (error) {
        console.error("Error during Google authentication:", error);
        setError("Google authentication failed");
      }
    },
    onError: (error) => {
      console.log("Google auth failed:", error);
      setError("Google authentication failed");
    },
  });

  const fetchGoogleUserInfo = async (token: string) => {
    const res = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    console.log("Fetched Google user info:", data);
    return data;
  };

  const handleRegistration = async (userInfo: User) => {
    try {
      console.log("Handling registration with userInfo:", userInfo);

      const requestBody = {
        email: userInfo.email,
        name: userInfo.name,
        googleId: userInfo.id,
      };

      const endpoint = "http://localhost:5000/api/users/register";
      console.log("Making registration request to:", endpoint);
      console.log("Request body:", requestBody);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log(`Response status: ${res.status}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const response = await res.json();
      console.log("Response from backend:", response);

      // Set profile and navigate to my-account
      setProfile({
        email: userInfo.email,
        name: userInfo.name,
        id: userInfo.id,
        picture: userInfo.picture,
      });
      navigate("/my-account");
    } catch (err) {
      if (err instanceof Error) {
        console.log("Error:", err.message);
        setError(err.message);
      } else {
        console.log("Unexpected error:", err);
        setError("An unexpected error occurred");
      }
    }
  };

  const handleLogin = async (userInfo: User) => {
    try {
      console.log("Handling login with userInfo:", userInfo);

      const requestBody = {
        email: userInfo.email,
        name: userInfo.name,
        googleId: userInfo.id,
      };

      const endpoint = "http://localhost:5000/api/users/login";
      console.log("Making login request to:", endpoint);
      console.log("Request body:", requestBody);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log(`Response status: ${res.status}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const response = await res.json();
      console.log("Response from backend:", response);

      // Set profile and navigate to my-account
      setProfile({
        email: userInfo.email,
        name: userInfo.name,
        id: userInfo.id,
        picture: userInfo.picture,
      });
      navigate("/my-account");
    } catch (err) {
      if (err instanceof Error) {
        console.log("Error:", err.message);
        setError(err.message);
      } else {
        console.log("Unexpected error:", err);
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <RegisterLoginFormOuter>
      <RegisterLoginFormWrapperInner $isLogin={isLogin}>
        <Form onSubmit={(e) => e.preventDefault()}>
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
            {error && !isLogin && <div style={{ color: "red" }}>{error}</div>}
            <Divider>OR</Divider>
            <GoogleSignInButton onClick={() => handleGoogleAuth()}>
              <img src={googleIcon} alt="Google Icon" />
              <span>Register with Google</span>
            </GoogleSignInButton>
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
            {error && isLogin && <div style={{ color: "red" }}>{error}</div>}
            <Divider>OR</Divider>
            <GoogleSignInButton onClick={() => handleGoogleAuth()}>
              <img src={googleIcon} alt="Google Icon" />
              <span>Sign in with Google</span>
            </GoogleSignInButton>
          </LoginFormWrapperInner>
        </LoginFormWrapperOuter>
      </RegisterLoginFormWrapperInner>
    </RegisterLoginFormOuter>
  );
};

export default RegisterLoginForm;

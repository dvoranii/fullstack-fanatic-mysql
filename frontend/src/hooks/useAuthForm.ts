/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { TokenResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { User } from "../types/User";
import { registerUser, loginUser } from "../api/api";

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setProfile } = useUser();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleGoogleAuthSuccess = async (codeResponse: TokenResponse) => {
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
  };

  const handleGoogleAuthError = (error: any) => {
    console.log("Google auth failed:", error);
    setError("Google authentication failed");
  };

  const fetchGoogleUserInfo = async (token: string): Promise<User> => {
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
      const requestBody = {
        email: userInfo.email,
        name: userInfo.name,
        googleId: userInfo.id,
      };

      const response = await registerUser(requestBody);
      console.log(response);

      setProfile(userInfo);
      navigate("/my-account");
    } catch (err) {
      handleError(err);
    }
  };

  const handleLogin = async (userInfo: User) => {
    try {
      const requestBody = {
        email: userInfo.email,
        name: userInfo.name,
        googleId: userInfo.id,
      };

      const response = await loginUser(requestBody);
      console.log(response);

      setProfile(userInfo);
      navigate("/my-account");
    } catch (err) {
      handleError(err);
    }
  };

  const handleRegisterSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    source: "form" | "button"
  ) => {
    e.preventDefault();
    console.log("Handle register submit from:", source);
    // Handle manual registration logic if needed
  };

  const handleLoginSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    source: "form" | "button"
  ) => {
    e.preventDefault();
    console.log("Handle login submit", source);
    // Handle manual login logic if needed
  };

  const handleError = (err: any) => {
    if (err instanceof Error) {
      try {
        const parsedError = JSON.parse(err.message);
        if (parsedError.message) {
          setError(parsedError.message);
        } else {
          setError(err.message);
        }
      } catch (parseError) {
        setError(err.message);
      }
    } else {
      setError("An unexpected error occurred");
    }
  };

  return {
    isLogin,
    error,
    toggleForm,
    handleGoogleAuthSuccess,
    handleGoogleAuthError,
    handleRegisterSubmit,
    handleLoginSubmit,
  };
};

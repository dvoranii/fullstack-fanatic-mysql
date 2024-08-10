import { useState } from "react";
import { TokenResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { loginOrRegisterWithGoogle } from "../api/api";

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const { setProfile } = useUser();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleGoogleAuthSuccess = async (codeResponse: TokenResponse) => {
    console.log("Google auth successful, codeResponse:", codeResponse);
    try {
      const { token, user } = await loginOrRegisterWithGoogle(
        codeResponse.access_token
      );
      console.log("User from backend", user);

      localStorage.setItem("authToken", token);

      setProfile(user);

      navigate("/my-account");
    } catch (error) {
      console.error("Error during Google authentication:", error);
      setError("Google authentication failed");
    }
  };

  const handleGoogleAuthError = (error: unknown) => {
    console.log("Google auth failed:", error);
    setError("Google authentication failed");
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

  return {
    isLogin,
    error,
    setError,
    toggleForm,
    handleGoogleAuthSuccess,
    handleGoogleAuthError,
    handleRegisterSubmit,
    handleLoginSubmit,
    isTermsAccepted,
    setIsTermsAccepted,
  };
};

import { useState } from "react";
import { TokenResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { loginOrRegisterWithGoogle } from "../api/api";
// import { useAuthUtils } from "../utils/useAuthUtils";
// import { handleTokenExpiration } from "../utils/tokenUtils";

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const { setProfile } = useUser();
  const navigate = useNavigate();
  // const { logOut } = useAuthUtils();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleGoogleAuthSuccess = async (codeResponse: TokenResponse) => {
    try {
      const { token, user } = await loginOrRegisterWithGoogle(
        codeResponse.access_token
      );

      localStorage.setItem("authToken", token);

      setProfile(user);

      // handleTokenExpiration(token, logOut);

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

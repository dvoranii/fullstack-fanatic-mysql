import { useState } from "react";
import { TokenResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { loginOrRegisterWithGoogle, registerUser, loginUser } from "../api/api";
import validateField from "../utils/validationUtils";
import { fetchUserProfileAndFavourites } from "../utils/userUtils";

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const { setProfile, setFavouriteTutorials, setFavouriteBlogs } = useUser();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleGoogleAuthSuccess = async (codeResponse: TokenResponse) => {
    try {
      await loginOrRegisterWithGoogle(codeResponse.access_token);

      await fetchUserProfileAndFavourites(
        setProfile,
        setFavouriteTutorials,
        setFavouriteBlogs,
        setError
      );

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

  const handleRegisterSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    source: "form" | "button"
  ) => {
    e.preventDefault();
    console.log(source);

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById("confirm-password") as HTMLInputElement
    ).value;
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;

    const fields = [
      { fieldName: "username", value: username },
      { fieldName: "email", value: email },
      { fieldName: "password", value: password },
      {
        fieldName: "confirmPassword",
        value: confirmPassword,
        compareValue: password,
      },
    ];

    for (const field of fields) {
      const error = validateField(
        field.fieldName,
        field.value,
        field.compareValue
      );
      if (error) {
        setError(error);
        return;
      }
    }

    try {
      await registerUser({ email, password, name: username });
      await fetchUserProfileAndFavourites(
        setProfile,
        setFavouriteTutorials,
        setFavouriteBlogs,
        setError
      );

      navigate("my-account");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed. Please try again");
    }
  };

  const handleLoginSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    source: "form" | "button"
  ) => {
    e.preventDefault();
    console.log(source);

    const username = (
      document.getElementById("login-username") as HTMLInputElement
    ).value;
    const password = (
      document.getElementById("login-password") as HTMLInputElement
    ).value;

    // Validate the fields using the same validateField function
    const usernameError = validateField("username", username);
    if (usernameError) {
      setError(usernameError);
      return;
    }

    const passwordError = validateField("password", password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const { token } = await loginUser({ username, password });

      localStorage.setItem("accessToken", token);

      await fetchUserProfileAndFavourites(
        setProfile,
        setFavouriteTutorials,
        setFavouriteBlogs,
        setError
      );

      navigate("/my-account");
    } catch (error) {
      console.error("Error during login:", error);
      setError("Login failed. Please try again.");
    }
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

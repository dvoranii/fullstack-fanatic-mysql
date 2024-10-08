import { useState } from "react";
import { TokenResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import {
  googleLogin,
  googleRegister,
  registerUser,
  loginUser,
} from "../api/api";
import validateField from "../utils/validationUtils";
import { fetchUserProfileFavouritesAndComments } from "../utils/userUtils";

export const useAuthForm = (defaultToLogin = false) => {
  const [isLogin, setIsLogin] = useState(defaultToLogin);
  const [error, setError] = useState<string | null>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const { setProfile, setFavouriteTutorials, setFavouriteBlogs, setComments } =
    useUser();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    if (!isLogin) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  const handleGoogleRegister = async (codeResponse: TokenResponse) => {
    try {
      const response = await googleRegister(codeResponse.access_token);

      if (response.status === 409) {
        setError("This Google account is already registered. Please log in.");
        return;
      }

      await fetchUserProfileFavouritesAndComments(
        setProfile,
        setFavouriteTutorials,
        setFavouriteBlogs,
        setComments,
        setError
      );

      navigate("/my-account");
    } catch (error) {
      console.error("Error during Google registration:", error);
      setError("Google registration failed.");
    }
  };

  const handleGoogleLogin = async (codeResponse: TokenResponse) => {
    try {
      await googleLogin(codeResponse.access_token);

      await fetchUserProfileFavouritesAndComments(
        setProfile,
        setFavouriteTutorials,
        setFavouriteBlogs,
        setComments,
        setError
      );

      navigate("/my-account");
    } catch (error) {
      console.error("Error during Google login:", error);
      setError("Google login failed.");
    }
  };

  const handleRegisterSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

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
      await fetchUserProfileFavouritesAndComments(
        setProfile,
        setFavouriteTutorials,
        setFavouriteBlogs,
        setComments,
        setError
      );

      navigate("/my-account");
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);
          setError(parsedError.message);
        } catch {
          setError(error.message);
        }
      } else {
        setError("Registration failed. Please try again.");
      }
      console.error("Error during registration:", error);
    }
  };

  const handleLoginSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const username = (
      document.getElementById("login-username") as HTMLInputElement
    ).value;
    const password = (
      document.getElementById("login-password") as HTMLInputElement
    ).value;

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

      await fetchUserProfileFavouritesAndComments(
        setProfile,
        setFavouriteTutorials,
        setFavouriteBlogs,
        setComments,
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
    handleGoogleRegister,
    handleGoogleLogin,
    handleRegisterSubmit,
    handleLoginSubmit,
    isTermsAccepted,
    setIsTermsAccepted,
  };
};

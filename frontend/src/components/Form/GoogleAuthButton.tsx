import React from "react";
import googleIcon from "../../assets/images/google-signin-icon.png";
import { GoogleSignInButton } from "./styles/GoogleAuthButton.styled";

interface GoogleAuthButtonProps {
  handleGoogleAuth: () => void;
  text: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  handleGoogleAuth,
  text,
}) => (
  <GoogleSignInButton onClick={handleGoogleAuth}>
    <img src={googleIcon} alt="Google Icon" />
    <span>{text}</span>
  </GoogleSignInButton>
);

export default GoogleAuthButton;

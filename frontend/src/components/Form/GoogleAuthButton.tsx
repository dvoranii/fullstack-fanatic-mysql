import React from "react";
import googleIcon from "../../assets/images/google-signin-icon.png";
import { GoogleSignInButton } from "./styles/GoogleAuthButton.styled";

interface GoogleAuthButtonProps {
  handleClick: () => void;
  text: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  handleClick,
  text,
}) => (
  <GoogleSignInButton onClick={handleClick}>
    <img src={googleIcon} alt="Google Icon" />
    <span>{text}</span>
  </GoogleSignInButton>
);

export default GoogleAuthButton;

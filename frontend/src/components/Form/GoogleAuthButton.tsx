import React from "react";
import { GoogleSignInButton } from "./styles/GoogleAuthButton.styled";

interface GoogleAuthButtonProps {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  handleClick,
  text,
}) => (
  <GoogleSignInButton onClick={handleClick}>
    <img
      src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/misc/google-signin-icon.png"
      alt="Google Icon"
    />
    <span>{text}</span>
  </GoogleSignInButton>
);

export default GoogleAuthButton;

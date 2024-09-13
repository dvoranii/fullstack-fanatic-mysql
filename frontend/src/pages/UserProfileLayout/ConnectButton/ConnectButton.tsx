import React from "react";
import {
  StyledButton,
  ButtonIcon,
  ButtonText,
  //   ButtonTextWrapper,
  CustomIcon,
} from "./ConnectButton.styled";

interface ConnectButtonProps {
  href: string;
  text: string;
  onClick?: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({
  href,
  text,
  onClick,
}) => {
  return (
    <StyledButton href={href} onClick={onClick}>
      {/* <ButtonTextWrapper> */}
      <ButtonText>{text}</ButtonText>
      {/* </ButtonTextWrapper> */}

      <ButtonIcon>
        <CustomIcon />
      </ButtonIcon>
    </StyledButton>
  );
};

export default ConnectButton;

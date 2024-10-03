import {
  StyledButton,
  ButtonIcon,
  ButtonText,
  CustomIcon,
} from "./ConnectButton.styled";

interface ConnectButtonProps {
  text: string;
  onClick?: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ text, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <ButtonText>{text}</ButtonText>
      <ButtonIcon>
        <CustomIcon />
      </ButtonIcon>
    </StyledButton>
  );
};

export default ConnectButton;

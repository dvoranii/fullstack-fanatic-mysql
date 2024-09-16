import { LoginButtonWrapper, LoginBtn } from "./LoginButton.styled";
import { useLocation, useNavigate } from "react-router-dom";

const LoginButton: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignInClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (location.pathname === "/register") {
      e.preventDefault();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <LoginButtonWrapper>
      <LoginBtn onClick={handleSignInClick}>Sign In</LoginBtn>
    </LoginButtonWrapper>
  );
};

export default LoginButton;

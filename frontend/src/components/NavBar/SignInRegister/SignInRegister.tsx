import ProfileIcon from "../../../assets/images/profile-icon.png";
import { ProfileImg, SignInRegisterWrapper } from "./SignInRegister.styled";

const SignInRegister: React.FC = () => {
  return (
    <SignInRegisterWrapper>
      <p>Sign&nbsp;In</p>
      <ProfileImg src={ProfileIcon} />
    </SignInRegisterWrapper>
  );
};

export default SignInRegister;

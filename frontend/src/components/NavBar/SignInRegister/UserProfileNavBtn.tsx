import { NavLinkStyled } from "../NavBar.styled";
import ProfileIcon from "../../../assets/images/profile-icon.png";
import {
  ProfileImg,
  SignInRegisterWrapper,
} from "./SignInRegisterNavBtn.styled";
import { useAuthUtils } from "../../../utils/useAuthUtils";

const UserProfileNavBtn: React.FC = () => {
  const { logOut } = useAuthUtils();
  return (
    <NavLinkStyled to="/my-account" underlinewidth="0%">
      <SignInRegisterWrapper>
        <button onClick={logOut}>Log Out</button>
        <ProfileImg src={ProfileIcon} />
      </SignInRegisterWrapper>
    </NavLinkStyled>
  );
};

export default UserProfileNavBtn;

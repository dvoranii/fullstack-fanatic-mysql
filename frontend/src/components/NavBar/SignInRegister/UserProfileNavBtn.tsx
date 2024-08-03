import { NavLinkStyled } from "../NavBar.styled";
import ProfileIcon from "../../../assets/images/profile-icon.png";
import {
  ProfileImg,
  SignInRegisterWrapper,
} from "./SignInRegisterNavBtn.styled";

const UserProfileNavBtn: React.FC = () => {
  return (
    <NavLinkStyled to="/my-account" underlinewidth="0%">
      <SignInRegisterWrapper>
        <ProfileImg src={ProfileIcon} />
      </SignInRegisterWrapper>
    </NavLinkStyled>
  );
};

export default UserProfileNavBtn;

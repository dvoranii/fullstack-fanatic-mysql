import { NavLinkStyled } from "../NavBar.styled";
import ProfileIcon from "../../../assets/images/profile-icon.png";
import {
  ProfileImg,
  SignInRegisterWrapper,
} from "./SignInRegisterNavBtn.styled";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import useUser from "../../../hooks/useUser";

const UserProfileNavBtn: React.FC = () => {
  const navigate = useNavigate();
  const { setProfile } = useUser();

  const logOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    googleLogout();
    setProfile(null);
    navigate("/");
  };

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

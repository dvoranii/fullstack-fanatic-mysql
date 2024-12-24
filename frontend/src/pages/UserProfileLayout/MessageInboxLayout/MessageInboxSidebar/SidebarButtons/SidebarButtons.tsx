import { useContext } from "react";
import { UserContext } from "../../../../../context/UserContext";
import { IconBGWrapper, IconBG, IconImg } from "./SidebarButtons.styled";
import ProfilePicture from "../../../../../components/ProfilePicture/ProfilePicture";
import { NavLink } from "react-router-dom";

const SidebarButton: React.FC = () => {
  const { profile } = useContext(UserContext) || {};

  const profilePic = profile?.profile_picture;

  return (
    <IconBGWrapper>
      <IconBG>
        <NavLink to="/my-account">
          <ProfilePicture
            src={profilePic || "/assets/images/profile-icon.png"}
            alt="Profile picture"
            width="50px"
            border="3px solid #14213d"
          />
        </NavLink>
      </IconBG>

      <IconBG>
        <NavLink to="/my-account/settings">
          <IconImg src="/assets/images/settings-gear.png" />
        </NavLink>
      </IconBG>

      <IconBG>
        <NavLink to="/">
          <IconImg src="/assets/images/home/home-icon.png" title="Home" />
        </NavLink>
      </IconBG>
    </IconBGWrapper>
  );
};

export default SidebarButton;

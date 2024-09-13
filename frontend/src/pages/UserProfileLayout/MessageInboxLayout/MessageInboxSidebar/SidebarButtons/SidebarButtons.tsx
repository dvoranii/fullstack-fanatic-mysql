import { useContext } from "react";
import { UserContext } from "../../../../../context/UserContext";
import { IconBGWrapper, IconBG, IconImg } from "./SidebarButtons.styled";
import ProfilePicture from "../../../../../components/ProfilePicture/ProfilePicture";
import SettingsGear from "../../../../../assets/images/settings-gear.png";
import HomeIcon from "../../../../../assets/images/home-icon.png";
import { NavLink } from "react-router-dom";

const SidebarButton: React.FC = () => {
  const { profile } = useContext(UserContext) || {};

  const profilePic = profile?.profile_picture;

  return (
    <IconBGWrapper>
      <IconBG>
        <NavLink to="/my-account">
          <ProfilePicture
            src={profilePic || ""}
            alt="Profile picture"
            width="50px"
            border="3px solid #14213d"
          />
        </NavLink>
      </IconBG>

      <IconBG>
        <IconImg src={SettingsGear} />
      </IconBG>
      <IconBG>
        <NavLink to="/">
          <IconImg src={HomeIcon} title="Home" />
        </NavLink>
      </IconBG>
    </IconBGWrapper>
  );
};

export default SidebarButton;

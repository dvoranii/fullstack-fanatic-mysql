import React, { useState, useContext, useEffect, useRef } from "react";
import ProfileIconBlack from "../../../assets/images/profile-icon-black.png";
import {
  ProfileName,
  ProfileProfession,
  ViewProfileButton,
  DropdownItem,
  DropdownItemLogoutBtn,
  DropdownDivider,
  ProfileInfoWrapper,
  ProfilePictureAndInfoWrapper,
  ViewProfileButtonWrapper,
  AccountTitle,
  UserProfiledropdownWrapper,
} from "./UserProfileNavBtn.styled";
import { NavIconWrapper, NavIconImg } from "../../NavBar/NavBar.styled";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import { UserContext } from "../../../context/UserContext";
import { useAuthUtils } from "../../../utils/useAuthUtils";
import Dropdown from "../Dropdown/Dropdown";

const UserProfileNavBtn: React.FC = () => {
  const { profile } = useContext(UserContext) || {};
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { logOut } = useAuthUtils();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <NavIconWrapper>
        <NavIconImg
          src={ProfileIconBlack}
          onClick={handleDropdownToggle}
          alt="Profile Icon"
          title="User Profile"
          hoverEffect="opacity: 0.8;"
        />
        <Dropdown isVisible={isDropdownVisible} alignRight>
          <ProfilePictureAndInfoWrapper>
            <ProfilePicture
              src={profile?.profile_picture || ""}
              alt="Profile Picture"
              width="50px"
              border="none"
            />
            <ProfileInfoWrapper>
              <ProfileName>{profile?.name}</ProfileName>
              <ProfileProfession>{profile?.profession}</ProfileProfession>
            </ProfileInfoWrapper>
          </ProfilePictureAndInfoWrapper>
          <ViewProfileButtonWrapper>
            <ViewProfileButton to="/my-account">View Profile</ViewProfileButton>
          </ViewProfileButtonWrapper>
          <DropdownDivider />
          <UserProfiledropdownWrapper>
            <AccountTitle>Account</AccountTitle>
            <DropdownItem to="/my-account/inbox">Inbox</DropdownItem>
            <DropdownItem to="#">Settings</DropdownItem>
            <DropdownItem to="/plans-and-pricing">
              Plans And Pricing
            </DropdownItem>
            <DropdownItem to="#">Help</DropdownItem>
          </UserProfiledropdownWrapper>
          <DropdownDivider />
          <DropdownItemLogoutBtn onClick={logOut}>
            Log Out
          </DropdownItemLogoutBtn>
        </Dropdown>
      </NavIconWrapper>
    </div>
  );
};

export default UserProfileNavBtn;

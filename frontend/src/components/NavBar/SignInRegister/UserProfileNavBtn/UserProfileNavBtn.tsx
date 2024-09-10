import { useState, useEffect, useRef, useContext } from "react";
import ProfileIconBlack from "../../../../assets/images/profile-icon-black.png";
import { useAuthUtils } from "../../../../utils/useAuthUtils";
import {
  DropdownWrapper,
  ProfileName,
  ProfileProfession,
  ViewProfileButton,
  DropdownItem,
  DropdownDivider,
  ProfileIconImg,
} from "./UserProfileNavBtn.styled";
import { UserContext } from "../../../../context/UserContext";

const UserProfileNavBtn: React.FC = () => {
  const context = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);
  const { logOut } = useAuthUtils();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { profile } = context || {};

  const toggleDropdown = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsVisible(!isVisible);
  };

  const closeDropdown = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div ref={dropdownRef}>
      <ProfileIconImg
        src={ProfileIconBlack}
        onClick={(e) => toggleDropdown(e)}
        alt="Profile Icon"
      />

      <DropdownWrapper isVisible={isVisible}>
        <ProfileName>{profile?.name}</ProfileName>
        <ProfileProfession>{profile?.profession}</ProfileProfession>
        <ViewProfileButton to="/my-account">View Profile</ViewProfileButton>
        <DropdownDivider />
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Subscriptions</DropdownItem>
        <DropdownItem>Help</DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={logOut}>Log Out</DropdownItem>
      </DropdownWrapper>
    </div>
  );
};

export default UserProfileNavBtn;

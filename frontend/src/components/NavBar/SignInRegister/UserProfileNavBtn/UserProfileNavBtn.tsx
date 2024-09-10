import { useState, useEffect, useRef, useContext } from "react";
import ProfileIcon from "../../../../assets/images/profile-icon.png";
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
  const [isOpen, setIsOpen] = useState(false);
  const { logOut } = useAuthUtils();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { profile } = context || {};

  console.log(profile?.name, profile?.profession);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef}>
      <ProfileIconImg
        src={ProfileIcon}
        onClick={toggleDropdown}
        alt="Profile Icon"
      />

      {isOpen && (
        <DropdownWrapper>
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
      )}
    </div>
  );
};

export default UserProfileNavBtn;

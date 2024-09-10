import { useState, useEffect, useRef, useContext, useCallback } from "react";
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
  const { profile } = useContext(UserContext) || {};
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { logOut } = useAuthUtils();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdown = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsDropdownVisible((prevState) => !prevState);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isDropdownVisible) return;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div ref={dropdownRef}>
      <ProfileIconImg
        src={ProfileIconBlack}
        onClick={handleDropdown}
        alt="Profile Icon"
      />

      {isDropdownVisible && (
        <DropdownWrapper isDropdownVisible={isDropdownVisible}>
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

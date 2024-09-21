import { useState, useEffect, useRef, useContext, useCallback } from "react";
import ProfileIconBlack from "../../../../assets/images/profile-icon-black.png";
import { useAuthUtils } from "../../../../utils/useAuthUtils";
import {
  DropdownWrapper,
  DropdownItemWrapper,
  ProfileName,
  ProfileProfession,
  ViewProfileButton,
  DropdownItem,
  DropdownItemLogoutBtn,
  DropdownDivider,
  ProfileIconImg,
  ProfileInfoWrapper,
  ProfilePictureAndInfoWrapper,
  ViewProfileButtonWrapper,
  AccountTitle,
} from "./UserProfileNavBtn.styled";
import ProfilePicture from "../../../ProfilePicture/ProfilePicture";
import { UserContext } from "../../../../context/UserContext";

interface UserProfileNavBtnProps {
  setIsDropdownVisible?: (visible: boolean) => void;
}

const UserProfileNavBtn: React.FC<UserProfileNavBtnProps> = ({
  setIsDropdownVisible,
}) => {
  const { profile } = useContext(UserContext) || {};
  const [isDropdownVisible, setLocalDropdownVisible] = useState(false);
  const { logOut } = useAuthUtils();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdown = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      const newState = !isDropdownVisible;
      setLocalDropdownVisible(newState);
      if (setIsDropdownVisible) setIsDropdownVisible(newState);
    },
    [isDropdownVisible]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isDropdownVisible) return;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLocalDropdownVisible(false);
        if (setIsDropdownVisible) setIsDropdownVisible(false);
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
        <DropdownWrapper isdropdownvisible={isDropdownVisible}>
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

          <DropdownItemWrapper>
            <AccountTitle>Account</AccountTitle>
            <DropdownItem to="#">Settings</DropdownItem>
            <DropdownItem to="#">Subscriptions</DropdownItem>
            <DropdownItem to="#">Help</DropdownItem>
          </DropdownItemWrapper>

          <DropdownDivider />
          <DropdownItemWrapper>
            <DropdownItemLogoutBtn onClick={logOut}>
              Log Out
            </DropdownItemLogoutBtn>
          </DropdownItemWrapper>
        </DropdownWrapper>
      )}
    </div>
  );
};

export default UserProfileNavBtn;

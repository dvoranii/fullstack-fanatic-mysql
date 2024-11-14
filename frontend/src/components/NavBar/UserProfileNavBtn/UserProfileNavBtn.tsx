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
import Dropdown from "../../Dropdown/Dropdown";
import NotificationBadge from "../../NotificationBadge/NotificationBadge";
import { getUnreadConversationsCount } from "../../../services/messageService";

const UserProfileNavBtn: React.FC = () => {
  const { profile } = useContext(UserContext) || {};
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { logOut } = useAuthUtils();
  const containerRef = useRef<HTMLDivElement>(null);
  const [unreadInboxCount, setUnreadInboxCount] = useState(0);

  const handleDropdownToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isDropdownVisible) {
      try {
        const count = await getUnreadConversationsCount();
        setUnreadInboxCount(count);
      } catch (error) {
        console.error("Failed to fetch unread conversations count:", error);
      }
    }

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

  useEffect(() => {
    const fetchUnreadInboxCount = async () => {
      try {
        const count = await getUnreadConversationsCount();
        setUnreadInboxCount(count);
      } catch (error) {
        console.error("Failed to fetch unread conversations count:", error);
      }
    };

    fetchUnreadInboxCount();
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
            <DropdownItem to="/my-account/inbox" className="inbox-item">
              Inbox <NotificationBadge count={unreadInboxCount} />
            </DropdownItem>
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

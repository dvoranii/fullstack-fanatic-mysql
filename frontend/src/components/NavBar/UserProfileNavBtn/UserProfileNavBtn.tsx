import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import ProfileIconBlack from "../../../assets/images/nav/profile-icon-black.png";
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
  SettingsWrapper,
} from "./UserProfileNavBtn.styled";
import { NavIconWrapper, NavIconImg } from "../../NavBar/NavBar.styled";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import { UserContext } from "../../../context/UserContext";
import { useAuthUtils } from "../../../utils/useAuthUtils";
import Dropdown from "../../Dropdown/Dropdown";
import NotificationBadge from "../../NotificationBadge/NotificationBadge";
import { getUnreadConversationsCount } from "../../../services/conversationService";
import UnderConstructionIcon from "../../../assets/images/under-construction.png";

const UserProfileNavBtn: React.FC = () => {
  const isMounted = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { logOut } = useAuthUtils();

  const {
    profile,
    unreadNotificationCount = 0,
    setUnreadNotificationCount = () => {},
  } = useContext(UserContext) || {};

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleDropdownToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownVisible((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  }, []);

  useEffect(() => {
    let pollInterval: ReturnType<typeof setInterval>;

    const fetchUnreadCount = async () => {
      try {
        const count = await getUnreadConversationsCount();
        if (isMounted.current) {
          setUnreadNotificationCount(count);
        }
      } catch (error) {
        console.error("Failed to fetch unread conversations count:", error);
      }
    };

    fetchUnreadCount();

    if (isDropdownVisible) {
      pollInterval = setInterval(fetchUnreadCount, 30000);
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [isDropdownVisible, setUnreadNotificationCount]);

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible, handleClickOutside]);

  return (
    <div ref={containerRef}>
      <NavIconWrapper>
        <NavIconImg
          src={ProfileIconBlack}
          onClick={handleDropdownToggle}
          alt="Profile Icon"
          title="User Profile"
          hoverEffect="opacity: 0.8;"
          height="50"
          width="50"
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
              Inbox{" "}
              {unreadNotificationCount > 0 && (
                <NotificationBadge count={unreadNotificationCount} />
              )}
            </DropdownItem>
            <DropdownItem to="/my-account/settings">
              <SettingsWrapper>
                <span>Settings</span>{" "}
                <img
                  src={UnderConstructionIcon}
                  alt=""
                  title="Section under construction"
                />
              </SettingsWrapper>
            </DropdownItem>
            <DropdownItem to="/plans-and-pricing">
              Plans And Pricing
            </DropdownItem>
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

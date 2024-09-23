import React, { useState, useEffect, useRef } from "react";
import NotificationBell from "../../../assets/images/notification-bell.png";
import {
  NavIconImg,
  NavIconWrapper,
  NotificationCounter,
  NotificationContentWrapper,
} from "./NotificationButton.styled";
import Dropdown from "../Dropdown/Dropdown";

const NotificationButton: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
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
          src={NotificationBell}
          onClick={handleDropdownToggle}
          alt="Notifications"
          title="Notifications"
        />
        <NotificationCounter>1</NotificationCounter>
        <Dropdown isVisible={isDropdownVisible} alignRight>
          <NotificationContentWrapper>
            <p>No notifications currently</p>
          </NotificationContentWrapper>
        </Dropdown>
      </NavIconWrapper>
    </div>
  );
};

export default NotificationButton;

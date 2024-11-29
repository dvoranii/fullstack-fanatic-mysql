import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import {
  Nav,
  NavList,
  NavItem,
  NavPipe,
  // SmallFontSpan,
  Logo,
  NavLinkStyled,
  MobileNavList,
  LogoWrapper,
  AccountBtnsWrapper,
  NetworkPageLink,
} from "./NavBar.styled";
import FSFLogo from "../../assets/images/fsf-logo-notext.png";
import UserProfileNavBtn from "./UserProfileNavBtn/UserProfileNavBtn";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import LoginButton from "./LoginButton/LoginButton";
import NotificationButton from "./Notifications/Notifications";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import NetworkIcon from "../../assets/images/networking-icon.png";

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { profile } = useUser();

  const toggleMobileNav = () => {
    setOpen(!open);
  };

  return (
    <Nav>
      <NavLinkStyled to="/" underlinewidth="0%">
        <LogoWrapper>
          <Logo src={FSFLogo} />
        </LogoWrapper>
      </NavLinkStyled>

      <NavList>
        <NavItem>
          <NavLinkStyled to="/" underlinewidth="60%">
            Home
          </NavLinkStyled>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/about" underlinewidth="62%">
            About
            {/* &nbsp;<SmallFontSpan>▼</SmallFontSpan> */}
          </NavLinkStyled>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/tutorials" underlinewidth="68%">
            Tutorials
          </NavLinkStyled>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/blogs" underlinewidth="50%">
            Blog
          </NavLinkStyled>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/contact" underlinewidth="65%">
            Contact
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          {profile ? (
            <AccountBtnsWrapper>
              <NetworkPageLink to="/network">
                <img src={NetworkIcon} alt="network page" title="Network" />
              </NetworkPageLink>
              <ShoppingCart />
              <NotificationButton />
              <UserProfileNavBtn />
            </AccountBtnsWrapper>
          ) : (
            <LoginButton />
          )}
        </NavItem>
      </NavList>

      <BurgerMenu onClick={toggleMobileNav} isOpen={open} />

      <MobileNavList open={open}>
        <NavItem>
          <NavLinkStyled to="/" onClick={toggleMobileNav}>
            Home
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/about" onClick={toggleMobileNav}>
            About
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/tutorials" onClick={toggleMobileNav}>
            Tutorials
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/blogs" onClick={toggleMobileNav}>
            Blog
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/contact" onClick={toggleMobileNav}>
            Contact
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          {profile ? (
            <AccountBtnsWrapper>
              <ShoppingCart />
              <NotificationButton />
              <UserProfileNavBtn />
            </AccountBtnsWrapper>
          ) : (
            <LoginButton />
          )}
        </NavItem>
      </MobileNavList>
    </Nav>
  );
};

export default NavBar;

import React, { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import {
  Nav,
  NavList,
  NavItem,
  NavPipe,
  Logo,
  NavLinkStyled,
  MobileNavList,
  LogoWrapper,
  AccountBtnsWrapper,
  NetworkPageLink,
  ShoppingCartLink,
  UserProfileLink,
} from "./NavBar.styled";
import FSFLogo from "../../assets/images/fsf-logo-notext.png";
import UserProfileNavBtn from "./UserProfileNavBtn/UserProfileNavBtn";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import LoginButton from "./LoginButton/LoginButton";
import NotificationButton from "./Notifications/Notifications";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import NetworkIcon from "../../assets/images/networking-icon.png";
import ShoppingCartIcon from "../../assets/images/shopping-cart-icon.png";
import UserProfileIcon from "../../assets/images/profile-icon-black.png";

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { profile } = useUser();

  const toggleMobileNav = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Nav>
      <NavLinkStyled to="/" underlinewidth="0%">
        <LogoWrapper>
          <Logo src={FSFLogo} alt="logo" width="100" height="100" />
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
          </NavLinkStyled>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/tutorials" underlinewidth="72%">
            Tutorials
          </NavLinkStyled>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/blogs" underlinewidth="60%">
            Blog
          </NavLinkStyled>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/contact" underlinewidth="80%">
            Contact
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          {profile ? (
            <AccountBtnsWrapper>
              <NetworkPageLink to="/network">
                <img
                  src={NetworkIcon}
                  alt="network page"
                  title="Network"
                  height="54"
                  width="50"
                />
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
          <NavLinkStyled to="/" onClick={toggleMobileNav} underlinewidth="72%">
            Home
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled
            to="/about"
            onClick={toggleMobileNav}
            underlinewidth="72%"
          >
            About
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled
            to="/tutorials"
            onClick={toggleMobileNav}
            underlinewidth="80%"
          >
            Tutorials
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled
            to="/blogs"
            onClick={toggleMobileNav}
            underlinewidth="72%"
          >
            Blog
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled
            to="/contact"
            onClick={toggleMobileNav}
            underlinewidth="80%"
          >
            Contact
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          {profile ? (
            <AccountBtnsWrapper className="mobile-accounts-wrapper">
              <NetworkPageLink to="/network">
                <img
                  src={NetworkIcon}
                  alt="network page"
                  className="mobile-network-icon"
                  title="Network"
                  width="25"
                  height="25"
                />
              </NetworkPageLink>
              <ShoppingCartLink to="/my-cart">
                <img
                  src={ShoppingCartIcon}
                  alt="shopping cart icon"
                  width="25"
                  height="25"
                />
              </ShoppingCartLink>
              <UserProfileLink to="/my-account">
                <img
                  src={UserProfileIcon}
                  alt="profile icon"
                  width="25"
                  height="25"
                />
              </UserProfileLink>
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

import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import {
  Nav,
  NavList,
  NavItem,
  NavPipe,
  SmallFontSpan,
  Logo,
  NavLinkStyled,
  MobileNavList,
} from "./NavBar.styled";
import FSFLogo from "../../assets/images/fsf-logo-notext.png";
import SignInRegisterNavBtn from "./SignInRegister/SignInRegisterNavBtn";
import UserProfileNavBtn from "./SignInRegister/UserProfileNavBtn";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { profile } = useUser();

  const toggleMobileNav = () => {
    setOpen(!open);
  };

  return (
    <Nav>
      <NavLinkStyled to="/" underlinewidth="0%">
        <Logo src={FSFLogo} />
      </NavLinkStyled>

      <NavList>
        <NavItem>
          <NavLinkStyled to="/" underlinewidth="60%">
            Home <SmallFontSpan>▼</SmallFontSpan>
          </NavLinkStyled>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/about" underlinewidth="62%">
            About <SmallFontSpan>▼</SmallFontSpan>
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
            <UserProfileNavBtn />
          ) : (
            <NavLinkStyled to="/sign-in-register" underlinewidth="0%">
              <SignInRegisterNavBtn />
            </NavLinkStyled>
          )}
        </NavItem>
      </NavList>

      <BurgerMenu onClick={toggleMobileNav} />

      <MobileNavList open={open}>
        <NavItem>
          <NavLinkStyled to="/" onClick={toggleMobileNav}>
            Home <SmallFontSpan>▼</SmallFontSpan>
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/about" onClick={toggleMobileNav}>
            About <SmallFontSpan>▼</SmallFontSpan>
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
            <UserProfileNavBtn />
          ) : (
            <NavLinkStyled to="/sign-in-register" underlinewidth="0%">
              <SignInRegisterNavBtn />
            </NavLinkStyled>
          )}
        </NavItem>
      </MobileNavList>
    </Nav>
  );
};

export default NavBar;

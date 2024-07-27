import React from "react";
import {
  Nav,
  NavList,
  NavItem,
  NavPipe,
  SmallFontSpan,
  Logo,
  NavLinkStyled,
} from "./NavBar.styled";
import FSFLogo from "../../assets/images/fsf-logo-notext.png";
import SignInRegister from "./SignInRegister/SignInRegister";

const NavBar: React.FC = () => {
  return (
    <Nav>
      <NavLinkStyled to="/">
        <Logo src={FSFLogo} />
      </NavLinkStyled>

      <NavList>
        <NavItem>
          <NavLinkStyled to="/" underlineWidth="60%">
            Home <SmallFontSpan>▼</SmallFontSpan>
          </NavLinkStyled>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/about" underlineWidth="62%">
            About <SmallFontSpan>▼</SmallFontSpan>
          </NavLinkStyled>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/tutorials" underlineWidth="68%">
            Tutorials
          </NavLinkStyled>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/blogs" underlineWidth="50%">
            Blog
          </NavLinkStyled>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/contact" underlineWidth="65%">
            Contact
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/sign-in" className="no-underline">
            <SignInRegister />
          </NavLinkStyled>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default NavBar;

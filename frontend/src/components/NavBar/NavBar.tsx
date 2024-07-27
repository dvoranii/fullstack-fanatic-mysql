import React from "react";
import {
  Nav,
  NavList,
  NavItem,
  NavLink,
  SmallFontSpan,
  Logo,
} from "./NavBar.styled";
import FSFLogo from "../../assets/images/fsf-logo-notext.png";

const NavBar: React.FC = () => {
  return (
    <Nav>
      <NavLink to="/">
        <Logo src={FSFLogo} />
      </NavLink>

      <NavList>
        <NavItem>
          <NavLink to="/">
            Home <SmallFontSpan>▼</SmallFontSpan>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/about">
            About <SmallFontSpan>▼</SmallFontSpan>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/tutorials">Tutorials</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/blogs">Blog</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contact">Contact</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default NavBar;

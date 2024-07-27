import React from "react";
import { Nav, NavList, NavItem, NavLink, SmallFontSpan } from "./NavBar.styled";

const NavBar: React.FC = () => {
  return (
    <Nav>
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

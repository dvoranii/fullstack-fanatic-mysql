import React from "react";
import { Nav, NavList, NavItem, NavLink } from "./NavBar.styled";

const NavBar: React.FC = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/tutorials">Tutorials</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default NavBar;

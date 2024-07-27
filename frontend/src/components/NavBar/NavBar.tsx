import React, { useState } from "react";
import {
  Nav,
  NavList,
  NavItem,
  NavLink,
  NavPipe,
  SmallFontSpan,
  Logo,
  MobileNavList,
} from "./NavBar.styled";
import FSFLogo from "../../assets/images/fsf-logo-notext.png";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <Nav>
      <NavLink to="/">
        <Logo src={FSFLogo} />
      </NavLink>

      <NavList>
        <NavItem>
          <NavLink to="/">
            Home&nbsp;<SmallFontSpan>▼</SmallFontSpan>
          </NavLink>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLink to="/about">
            About&nbsp;<SmallFontSpan>▼</SmallFontSpan>
          </NavLink>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLink to="/tutorials">Tutorials</NavLink>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLink to="/blogs">Blog</NavLink>
          <NavPipe>|</NavPipe>
        </NavItem>
        <NavItem>
          <NavLink to="/contact">Contact</NavLink>
        </NavItem>
      </NavList>

      <BurgerMenu onClick={toggleMenu} />
      <MobileNavList open={menuOpen}>
        <NavItem>
          <NavLink to="/" onClick={toggleMenu}>
            Home <SmallFontSpan>▼</SmallFontSpan>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/about" onClick={toggleMenu}>
            About <SmallFontSpan>▼</SmallFontSpan>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/tutorials" onClick={toggleMenu}>
            Tutorials
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/blogs" onClick={toggleMenu}>
            Blog
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contact" onClick={toggleMenu}>
            Contact
          </NavLink>
        </NavItem>
      </MobileNavList>
    </Nav>
  );
};

export default NavBar;

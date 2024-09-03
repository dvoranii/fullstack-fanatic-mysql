import styled from "styled-components";
import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";

interface NavLinkStyledProps {
  underlinewidth?: string;
}

export const Nav = styled.nav`
  background: #f8f8f8;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
  padding: 8px;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: 915px) {
    display: none;
  }
`;

export const MobileNavList = styled.ul<{ open: boolean }>`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: #f8f8f8;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 200px;
  padding: 2rem;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  @media (min-width: 915px) {
    display: none;
  }
  li:first-child {
    margin-top: 2.4rem;
  }

  a {
    padding-right: 0;
  }
`;

export const NavItem = styled.li`
  margin: 0 1rem;
  position: relative;
`;

export const NavPipe = styled.span`
  color: #ffb923;
  margin: 0 0.5rem;
  font-weight: bold;
`;

export const SmallFontSpan = styled.span`
  font-size: 0.75em;
`;

export const NavLinkStyled = styled(NavLink)<NavLinkStyledProps>`
  color: #222;
  text-decoration: none;
  padding-right: 2.2rem;
  position: relative;

  &::after {
    content: "";
    display: ${({ underlinewidth }) =>
      underlinewidth === "0%" ? "none" : "block"};
    width: ${({ underlinewidth }) => underlinewidth || "100%"};
    height: 2px;
    background-color: #ffb923;
    position: absolute;
    bottom: -8px;
    left: 0;
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: center;
  }

  &.active {
    font-weight: bold;
  }

  &:hover::after,
  &.active::after {
    transform: ${({ underlinewidth }) =>
      underlinewidth === "0%" ? "none" : "scaleX(1)"};
  }

  &.no-underline::after {
    content: none;
  }
`;

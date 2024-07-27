import styled from "styled-components";
import { Link } from "react-router-dom";

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

  @media (max-width: 858px) {
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

  @media (min-width: 859px) {
    display: none;
  }
  li:first-child {
    margin-top: 2.4rem;
  }
`;

export const NavItem = styled.li`
  margin: 0 1rem;
`;

export const NavPipe = styled.span`
  color: #ffb923;
  margin: 0 0.5rem;
  font-weight: bold;
`;

export const NavLink = styled(Link)`
  color: #222;
  text-decoration: none;
  padding-right: 2.2rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const SmallFontSpan = styled.span`
  font-size: 0.75em;
`;

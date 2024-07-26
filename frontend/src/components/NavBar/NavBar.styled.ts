import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  background: #333;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  width: 50%;
`;

export const NavItem = styled.li`
  margin: 0 1rem;
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

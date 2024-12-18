import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

interface NavLinkStyledProps {
  underlinewidth?: string;
}

export const Nav = styled.nav`
  background: #f8f8f8;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
  top: 0;
  left: 0;
  width: 100%;
  position: relative;
  z-index: 999;

  @media screen and (max-width: 915px) {
    height: 100px;
  }
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
  padding: 8px;

  @media screen and (max-width: 915px) {
    width: 75px;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: 989px) {
    display: none;
  }
`;

export const MobileNavList = styled.ul<{ open: boolean }>`
  list-style: none;
  display: flex;
  flex-direction: column;
  text-align: center;
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

  .mobile-network-icon {
    width: 25px;
    margin: 0;
  }

  .mobile-accounts-wrapper {
    gap: 10px;
    padding-top: 1.2rem;
  }

  @media (min-width: 989px) {
    display: none;
  }
  li:first-child {
    margin-top: 6.4rem;
  }
  li:last-child {
    margin: 0 auto;
  }

  li {
    margin-top: 2.4rem;
    margin: 1.42em auto;

    a {
      width: fit-content;
    }
  }
`;

export const NavItem = styled.li`
  margin: 0 1rem;
  position: relative;
  display: flex;
  user-select: none;
`;

export const NavPipe = styled.span`
  color: #ffb923;
  margin: 0 0.5rem;
  font-weight: bold;
`;

export const NavLinkStyled = styled(NavLink)<NavLinkStyledProps>`
  color: #222;
  text-decoration: none;
  padding-right: 2.2rem;
  position: relative;
  font-family: "ZenKakuGothicNewMedium", sans-serif;
  width: fit-content;

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

  &:last-child {
    padding-right: 1.2rem;
  }
`;

export const LogoWrapper = styled.div`
  user-select: none;
  @media screen and (max-width: 913px) {
    display: flex;
    justify-content: flex-start;
  }
`;

export const NavIconWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const NavIconImg = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "hoverEffect",
})<{ hoverEffect?: string }>`
  width: 30px;
  height: auto;
  margin: 10px;
  transition: all 150ms ease;

  &:hover {
    cursor: pointer;
    ${(props) => props.hoverEffect || "filter: invert(1);"}
  }
`;

export const AccountBtnsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NetworkPageLink = styled(NavLink)`
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    margin: 10px;
  }
`;

export const ShoppingCartLink = styled(Link)`
  display: flex;
  align-items: center;
  img {
    width: 25px;
    height: auto;
  }
`;
export const UserProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  img {
    width: 25px;
    height: auto;
  }
`;

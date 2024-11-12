import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../GlobalStyles";

export const FooterWrapperOuter = styled.footer`
  background-color: ${colors.secondary};
  color: #fff;
  width: 100%;
  padding: 20px 0;
  user-select: none;
`;

export const FooterWrapperInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  align-items: center;
  justify-items: center;
  width: 100%;
  margin: 0 auto;
  height: 250px;

  .seperator {
    width: 240px;
    grid-column: 2;
    grid-row: 2;
    margin-bottom: 2.4rem;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    text-align: center;
  }
`;

export const FooterNavWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 3;
  width: 100%;
  padding-left: 2.4rem;

  h3 {
    color: #14213d;
    border-bottom: 1px solid #14213d;
    width: fit-content;
    text-transform: uppercase;
    font-family: "Roboto";
  }
`;

export const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FooterNavLink = styled(Link)`
  color: #222;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  width: fit-content;
  transition: all 150ms ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    color: #fff;
  }
`;

export const CenteredSlogan = styled.div`
  grid-column: 2;
  grid-row: 1 / 3;
  font-size: 3.2rem;
  text-align: center;
  margin-top: -40px;
  color: #14213d;
  font-family: "Anybody";
  font-weight: bold;
  text-transform: uppercase;

  align-self: center;
`;

export const FooterSocialLinks = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: flex;
  gap: 10px;
  height: 100%;
  align-items: flex-end;

  @media (max-width: 768px) {
    grid-column: 1;
    justify-content: center;
  }
`;

export const SocialLinkIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const FooterLogoLink = styled(Link)`
  grid-column: 3;
  grid-row: 2;
  justify-self: end;
`;

export const FooterLogo = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 2.4rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    justify-self: center;
  }
`;

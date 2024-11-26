import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../GlobalStyles";
import waveEffectBg from "../../assets/images/wave-effect-bg.jpg";

export const FooterWrapperOuter = styled.footer`
  background-color: ${colors.secondary};
  color: #fff;
  width: 100%;
  padding: 20px 0;
  user-select: none;
  background-image: linear-gradient(
      rgba(255, 175, 43, 1),
      rgba(255, 175, 43, 0.65)
    ),
    url(${waveEffectBg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding-bottom: 3.2rem;
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

  .seperator {
    width: 220px;
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
  font-size: clamp(1.8rem, 4vw, 2.8rem);
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
  gap: 1.2rem;
  height: 100%;
  align-items: flex-end;
`;

export const IconWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 5px;
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    transition: all 300ms ease;
  }

  &:hover {
    &::after {
      width: 95%;
      height: 8px;
      background-color: rgba(0, 0, 0, 0.1);
      filter: blur(1px);
      bottom: -12px;
    }
  }
`;

export const SocialLinkIcon = styled.img`
  width: 30px;
  height: 30px;
  transition: all 300ms ease;

  ${IconWrapper}:hover & {
    transform: translateY(-4px) scale(1.05);
    filter: brightness(1.5);
  }
`;

export const FooterLogoLink = styled(Link)`
  grid-column: 3;
  grid-row: 4;
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

export const LegalWrapper = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  margin-top: 20px;
  grid-row: 4;

  @media (max-width: 768px) {
    margin-top: 15px;
    grid-column: 2;
  }
`;

export const LegalLinksWrapper = styled.div`
  margin-bottom: 10px;
`;

export const LegalLink = styled.a`
  color: #fff;
  text-decoration: underline;
  margin: 0 10px;
  font-size: 0.9rem;
  transition: color 150ms ease;

  &:hover {
    color: ${colors.primary}; /* Accent color for hover effect */
  }
`;

export const LegalText = styled.p`
  color: #fff;
  font-size: 0.8rem;
  margin: 0;
`;

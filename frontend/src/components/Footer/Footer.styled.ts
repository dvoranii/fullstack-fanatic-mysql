import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../GlobalStyles";
import waveEffectBg from "../../assets/images/wave-effect-bg.jpg";

export const FooterWrapperOuter = styled.footer`
  background-color: ${colors.secondary};
  color: #fff;
  width: 100%;
  min-height: 100px;
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
  position: relative;
`;

export const FooterWrapperInner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  margin: 0 auto;

  .seperator {
    width: 220px;
    height: auto;
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

export const Column2Wrapper = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;

  @media screen and (max-width: 768px) {
    grid-column: 1;
  }
`;

export const FooterNavWrapper = styled.div`
  grid-column: 1;
  width: 100%;
  padding-left: 2.4rem;

  h3 {
    color: #14213d;
    border-bottom: 1px solid #14213d;
    width: fit-content;
    text-transform: uppercase;
    font-family: "Roboto";
  }

  @media (max-width: 768px) {
    display: none;
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
  font-size: clamp(1.4rem, 6vw, 2.8rem);
  text-align: center;
  color: #14213d;
  font-family: "Anybody";
  font-weight: bold;
  text-transform: uppercase;
  align-self: center;
`;

export const FooterSocialLinks = styled.div`
  display: flex;
  gap: 1.2rem;
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
  height: auto;
  transition: all 300ms ease;

  ${IconWrapper}:hover & {
    transform: translateY(-4px) scale(1.05);
    filter: brightness(1.5);
  }
`;

export const FooterLogoLink = styled(Link)`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 20px;
  @media screen and (max-width: 450px) {
    padding: 8px;
  }
`;

export const FooterLogo = styled.img`
  width: clamp(50px, 5vw, 70px);
  height: auto;
  opacity: 0.9;

  @media (max-width: 768px) {
    justify-self: center;
  }

  @media screen and (max-width: 450px) {
    width: 35px;
  }
`;

export const LegalWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  grid-row: 4;
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
    color: ${colors.primary};
  }
`;

export const LegalText = styled.p`
  color: #fff;
  font-size: 0.8rem;
  margin: 0;
`;

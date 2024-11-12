import {
  FooterWrapperOuter,
  FooterWrapperInner,
  FooterNav,
  FooterNavLink,
  FooterSocialLinks,
  SocialLinkIcon,
  FooterNavWrapper,
  CenteredSlogan,
  FooterLogo,
  FooterLogoLink,
} from "./Footer.styled";

import logo from "../../assets/images/fsf-logo-darkblue.png";
import githubIcon from "../../assets/images/socials/github-icon.png";
import facebookIcon from "../../assets/images/socials/facebook.png";
import codepenIcon from "../../assets/images/socials/codepen.png";
import tiktokIcon from "../../assets/images/socials/tiktok-icon.png";
import Seperator from "../../assets/images/seperator.png";

const Footer = () => {
  return (
    <FooterWrapperOuter>
      <FooterWrapperInner>
        <FooterNavWrapper>
          <h3>Navigation</h3>
          <FooterNav>
            <FooterNavLink to="/">Home</FooterNavLink>
            <FooterNavLink to="/about">About</FooterNavLink>
            <FooterNavLink to="/tutorials">Tutorials</FooterNavLink>
            <FooterNavLink to="/blogs">Blog</FooterNavLink>
            <FooterNavLink to="/network">Network</FooterNavLink>
            <FooterNavLink to="/contact">Contact</FooterNavLink>
          </FooterNav>
        </FooterNavWrapper>

        <CenteredSlogan>Full stack. Full potential.</CenteredSlogan>
        <img className="seperator" src={Seperator} alt="" />

        <FooterSocialLinks>
          <a
            href="https://github.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialLinkIcon src={githubIcon} alt="GitHub" />
          </a>
          <a
            href="https://facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialLinkIcon src={facebookIcon} alt="Facebook" />
          </a>
          <a
            href="https://codepen.io/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialLinkIcon src={codepenIcon} alt="CodePen" />
          </a>
          <a
            href="https://tiktok.com/@yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialLinkIcon src={tiktokIcon} alt="TikTok" />
          </a>
        </FooterSocialLinks>

        <FooterLogoLink to="/">
          <FooterLogo src={logo} alt="Company Logo" />
        </FooterLogoLink>
      </FooterWrapperInner>
    </FooterWrapperOuter>
  );
};

export default Footer;

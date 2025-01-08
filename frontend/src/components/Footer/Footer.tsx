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
  IconWrapper,
  LegalWrapper,
  LegalText,
  LegalLinksWrapper,
  LegalLink,
  Column2Wrapper,
} from "./Footer.styled";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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

        <Column2Wrapper>
          <CenteredSlogan>
            Full&nbsp;stack.&nbsp;Full&nbsp;potential.
          </CenteredSlogan>
          <img
            className="seperator"
            src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/misc/seperator.png"
            alt="seperator"
            loading="lazy"
            width="220"
            height="47"
          />

          <FooterSocialLinks>
            <IconWrapper>
              <a
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialLinkIcon
                  src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/socials/github-icon.png"
                  alt="GitHub"
                  loading="lazy"
                  width="30"
                  height="30"
                />
              </a>
            </IconWrapper>

            <IconWrapper>
              <a
                href="https://facebook.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialLinkIcon
                  src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/socials/facebook.png"
                  alt="Facebook"
                  loading="lazy"
                  width="30"
                  height="30"
                />
              </a>
            </IconWrapper>
            <IconWrapper>
              <a
                href="https://codepen.io/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialLinkIcon
                  src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/socials/codepen.png"
                  alt="CodePen"
                  loading="lazy"
                  width="30"
                  height="30"
                />
              </a>
            </IconWrapper>
            <IconWrapper>
              <a
                href="https://tiktok.com/@yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialLinkIcon
                  src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/socials/tiktok-icon.png"
                  alt="TikTok"
                  loading="lazy"
                  width="30"
                  height="30"
                />
              </a>
            </IconWrapper>
          </FooterSocialLinks>

          <LegalWrapper>
            <LegalLinksWrapper>
              <LegalLink href="/privacy-policy">Privacy Policy</LegalLink>
              <LegalLink href="/terms-and-conditions">
                Terms and Conditions
              </LegalLink>
            </LegalLinksWrapper>
            <LegalText>
              &copy; {currentYear} Full Stack Fanatic Inc.™. All rights
              reserved.
            </LegalText>
          </LegalWrapper>
        </Column2Wrapper>
      </FooterWrapperInner>

      <FooterLogoLink to="/">
        <FooterLogo
          src="/assets/images/fsf-logo-darkblue.png"
          alt="Company Logo"
          loading="lazy"
          width="70"
          height="70"
        />
      </FooterLogoLink>
    </FooterWrapperOuter>
  );
};

export default Footer;

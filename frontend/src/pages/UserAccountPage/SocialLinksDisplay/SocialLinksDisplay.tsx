import { SocialSectionWrapperInner } from "./SocialLinksDisplay.styled";
import GithubIcon from "../../../assets/images/account/github-icon.png";
import IgIcon from "../../../assets/images/account/ig-icon.png";
import LinkedinIcon from "../../../assets/images/account/linkedin-icon.png";
import TiktokIcon from "../../../assets/images/account/tiktok-icon.png";
import XIcon from "../../../assets/images/account/x-icon.png";
import MetaIcon from "../../../assets/images/account/meta-icon.png";
import YouTubeIcon from "../../../assets/images/account/youtube-icon.png";

interface SocialLinksDisplayProps {
  socialLinks: { [key: string]: string };
}

const SocialLinksDisplay: React.FC<SocialLinksDisplayProps> = ({
  socialLinks,
}) => {
  const icons: { [key: string]: string } = {
    github: GithubIcon,
    instagram: IgIcon,
    facebook: MetaIcon,
    linkedin: LinkedinIcon,
    tiktok: TiktokIcon,
    twitter: XIcon,
    youtube: YouTubeIcon,
  };

  if (Object.keys(socialLinks).length === 0) {
    return null;
  }

  return (
    <SocialSectionWrapperInner>
      <h3>Links</h3>
      <ul>
        {Object.entries(socialLinks).map(([platform, url]) => (
          <li key={platform}>
            <a
              href={url.startsWith("http") ? url : `http://${url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icons[platform]} alt={`${platform} Logo`} />
            </a>
          </li>
        ))}
      </ul>
    </SocialSectionWrapperInner>
  );
};

export default SocialLinksDisplay;

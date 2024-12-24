import { SocialSectionWrapperInner } from "./SocialLinksDisplay.styled";

interface SocialLinksDisplayProps {
  socialLinks: { [key: string]: string };
}

const SocialLinksDisplay: React.FC<SocialLinksDisplayProps> = ({
  socialLinks,
}) => {
  const icons: { [key: string]: string } = {
    github: "/assets/images/socials/github-icon.png",
    instagram: "/assets/images/socials/ig-icon.png",
    facebook: "/assets/images/socials/meta-icon.png",
    linkedin: "/assets/images/socials/linkedin-icon.png",
    tiktok: "/assets/images/socials/tiktok-icon.png",
    twitter: "/assets/images/socials/x-icon.png",
    youtube: "/assets/images/socials/youtube-icon.png",
  };

  if (Object.keys(socialLinks).length === 0) {
    return null;
  }

  return (
    <SocialSectionWrapperInner>
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

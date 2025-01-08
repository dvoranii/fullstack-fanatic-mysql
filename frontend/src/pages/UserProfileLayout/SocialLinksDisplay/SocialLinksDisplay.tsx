import { SocialSectionWrapperInner } from "./SocialLinksDisplay.styled";

interface SocialLinksDisplayProps {
  socialLinks: { [key: string]: string };
}

const SocialLinksDisplay: React.FC<SocialLinksDisplayProps> = ({
  socialLinks,
}) => {
  const icons: { [key: string]: string } = {
    github:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/socials/github-icon.png",
    instagram:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/socials/ig-icon.png",
    facebook:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/socials/facebook.png",
    linkedin:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/socials/linkedin-icon.png",
    tiktok:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/socials/tiktok-icon.png",
    twitter:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/socials/x-icon.png",
    youtube:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/socials/youtube-icon.png",
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

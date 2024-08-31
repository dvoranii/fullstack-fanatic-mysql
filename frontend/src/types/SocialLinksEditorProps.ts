export interface SocialLinksEditorProps {
  socialLinks: { [key: string]: string };
  setSocialLinks: (socialLinks: { [key: string]: string }) => void;
  markSocialLinksChanged: () => void;
}

import {
  DeleteButton,
  SocialMenuDropdown,
  SocialLinkWrapper,
} from "./SocialLinksEditor.styled";
import { Input, FormGroup, Label } from "../EditProfileModal.styled";
import { handleTokenExpiration } from "../../../../services/tokenService";
import { SocialLinksEditorProps } from "../../../../types/SocialLinksEditorProps";
import { deleteSocialLink } from "../../../../services/profileService";
import { useCsrfToken } from "../../../../hooks/useCsrfToken";

const SocialLinksEditor: React.FC<SocialLinksEditorProps> = ({
  socialLinks,
  setSocialLinks,
  markSocialLinksChanged,
}) => {
  const csrfToken = useCsrfToken();
  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialLinks({
      ...socialLinks,
      [e.target.name]: e.target.value,
    });
    markSocialLinksChanged();
  };

  const handleAddSocialLink = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlatform = e.target.value;
    if (!socialLinks[selectedPlatform]) {
      setSocialLinks({
        ...socialLinks,
        [selectedPlatform]: "",
      });
      markSocialLinksChanged();
    }

    e.target.selectedIndex = 0;
  };

  const handleDeleteSocialLink = async (platform: string) => {
    const token = await handleTokenExpiration();

    if (!token) {
      throw new Error("User not authenticated");
    }
    try {
      await deleteSocialLink(platform, token, csrfToken);

      const updatedLinks = { ...socialLinks };
      delete updatedLinks[platform];

      setSocialLinks(updatedLinks);
      markSocialLinksChanged();
    } catch (error) {
      console.error(error);
    }
  };

  const availablePlatforms = [
    "facebook",
    "twitter",
    "instagram",
    "linkedin",
    "youtube",
  ].filter((platform) => !socialLinks[platform]);

  return (
    <FormGroup>
      <Label>Social Links:</Label>
      {Object.keys(socialLinks).map((platform) => (
        <SocialLinkWrapper key={platform}>
          <Input
            type="text"
            name={platform}
            value={socialLinks[platform]}
            onChange={handleSocialLinkChange}
            placeholder={`${
              platform.charAt(0).toUpperCase() + platform.slice(1)
            } URL`}
          />
          <DeleteButton onClick={() => handleDeleteSocialLink(platform)}>
            &times;
          </DeleteButton>
        </SocialLinkWrapper>
      ))}
      <SocialMenuDropdown onChange={handleAddSocialLink} defaultValue="">
        <option value="" disabled>
          Add Social Link
        </option>
        {availablePlatforms.map((platform) => (
          <option key={platform} value={platform}>
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </option>
        ))}
      </SocialMenuDropdown>
    </FormGroup>
  );
};

export default SocialLinksEditor;

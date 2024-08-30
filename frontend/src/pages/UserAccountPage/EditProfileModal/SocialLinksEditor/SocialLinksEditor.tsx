import { Input, FormGroup, Label } from "../EditProfileModal.styled"; // Adjust the import path as necessary

interface SocialLinksEditorProps {
  socialLinks: { [key: string]: string };
  setSocialLinks: (socialLinks: { [key: string]: string }) => void;
}

const SocialLinksEditor: React.FC<SocialLinksEditorProps> = ({
  socialLinks,
  setSocialLinks,
}) => {
  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialLinks({
      ...socialLinks,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSocialLink = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlatform = e.target.value;
    if (!socialLinks[selectedPlatform]) {
      setSocialLinks({
        ...socialLinks,
        [selectedPlatform]: "",
      });
    }

    e.target.selectedIndex = 0;
  };

  return (
    <FormGroup>
      <Label>Social Links:</Label>
      {Object.keys(socialLinks).map((platform) => (
        <div key={platform}>
          <Input
            type="text"
            name={platform}
            value={socialLinks[platform]}
            onChange={handleSocialLinkChange}
            placeholder={`${
              platform.charAt(0).toUpperCase() + platform.slice(1)
            } URL`}
          />
        </div>
      ))}
      <select onChange={handleAddSocialLink} defaultValue="">
        <option value="" disabled>
          Add Social Link
        </option>
        <option value="facebook">Facebook</option>
        <option value="twitter">Twitter</option>
        <option value="instagram">Instagram</option>
        <option value="linkedin">LinkedIn</option>
        <option value="youtube">YouTube</option>
      </select>
    </FormGroup>
  );
};

export default SocialLinksEditor;

import { useContext } from "react";
import {
  SettingsContainer,
  Sidebar,
  Content,
  SectionHeader,
  Section,
  SettingItem,
  ViewButton,
  ProfileWrapper,
  ProfileName,
  LinkButton,
} from "./Settings.styled";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import { UserContext } from "../../context/UserContext";
import EditIcon from "../../assets/images/account/edit-icon.png";

const Settings = () => {
  const { profile } = useContext(UserContext) || {};

  console.log(profile);
  return (
    <SettingsContainer>
      <Sidebar>
        <ProfileWrapper>
          <ProfilePicture
            src={profile?.profile_picture || ""}
            alt={""}
            width={"50px"}
            border={"2px solid black"}
          />
          <ProfileName>{profile?.name}</ProfileName>
          <LinkButton href="/my-account" target="_blank">
            View Profile
          </LinkButton>
        </ProfileWrapper>
        <nav>
          <ul>
            <li>
              <a href="#">General</a>
            </li>
            <li>
              <a href="#">Privacy & Security</a>
            </li>
            <li>
              <a href="#">Purchases & Subscriptions</a>
            </li>
          </ul>
        </nav>
      </Sidebar>

      <Content>
        <Section>
          <SectionHeader>General</SectionHeader>
          <SettingItem>
            <b>Current email:</b> ildidvorani@gmail.com
            <button className="edit-btn">
              <img src={EditIcon} alt="" />
            </button>
          </SettingItem>
          <SettingItem>
            <b>Timezone:</b> Eastern Standard (EST)
            <button className="edit-btn">
              <img src={EditIcon} alt="" />
            </button>
          </SettingItem>
          <SettingItem>
            <b>Currency:</b> Canadian Dollar ($ CAD)
            <button className="edit-btn">
              <img src={EditIcon} alt="" />
            </button>
          </SettingItem>
          <SettingItem>
            <b>Calendar:</b>
            <ViewButton>View</ViewButton>
          </SettingItem>
        </Section>

        <Section>
          <SectionHeader>Privacy & Security</SectionHeader>
          <SettingItem>
            <b>Block User:</b> <LinkButton href="#">Search</LinkButton>
          </SettingItem>
          <SettingItem>
            <b>2FA:</b> <LinkButton href="#">Set up 2FA</LinkButton>
          </SettingItem>
          <SettingItem>
            <b>Password:</b> ********{" "}
            <button className="edit-btn">
              <img src={EditIcon} alt="" />
            </button>
          </SettingItem>
        </Section>

        <Section>
          <SectionHeader>Purchases & Subscriptions</SectionHeader>
          <SettingItem>
            <LinkButton href="#">Billing Information</LinkButton>
          </SettingItem>
          <SettingItem>
            <LinkButton href="#">Manage Subscription</LinkButton>
          </SettingItem>
          <SettingItem>
            <LinkButton href="#">Purchase History</LinkButton>
          </SettingItem>
        </Section>
      </Content>
    </SettingsContainer>
  );
};

export default Settings;

import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
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
  ChangePasswordFormWrapper,
  PasswordContainer,
  SettingLabel,
  SettingContent,
  SettingText,
  EditButton,
  HelpIcon
} from "./Settings.styled";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import { UserContext } from "../../context/UserContext";

import { getUserAuthType } from "../../services/userService";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";
import WarningBar from "../../components/WarningBar/WarningBar";
import TooltipComponent from "../../components/Tooltip/Tooltip";

const Settings = () => {
  const { profile } = useContext(UserContext) || {};
  const [authType, setAuthType] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const fetchAuthType = async () => {
      try {
        const type = await getUserAuthType();
        setAuthType(type);
      } catch (error) {
        console.error("Failed to fetch user auth type:", error);
      }
    };

    if (profile) {
      fetchAuthType();
    }
  }, [profile]);

  return (
    <>
      <Helmet>
        <title>Settings - Full Stack Fanatic</title>
        <meta name="description" content="User settings page." />
      </Helmet>
      <WarningBar />
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
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Contact Support</a>
              </li>
              <li>
                <a href="#">Referral Program</a>
              </li>
            </ul>
          </nav>
        </Sidebar>

        <Content>
          <Section>
            <SectionHeader>General</SectionHeader>
            {authType === "google" ? (
              <SettingItem>
                <SettingLabel>Current email:</SettingLabel>
                <SettingContent>
                <SettingText>{profile?.email}</SettingText>
                <HelpIcon>
                  <img
                    src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/account/help-icon.png"
                    alt="Help Icon"
                  />
                  <TooltipComponent
                    left="-8px"
                    top="-82px"
                    message={
                      "Users signed up via Google accounts cannot change their emails"
                    }
                  />
                </HelpIcon>
                </SettingContent>
              </SettingItem>
            ) : (
              <SettingItem>
                <SettingLabel>Current email:</SettingLabel>  
                <SettingContent>  
                <SettingText>{profile?.email}</SettingText>
                <EditButton>
                  <img
                    src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/account/edit.webp"
                    alt="Edit"
                  />
                </EditButton>
                </SettingContent>
              </SettingItem>
            )}
            <SettingItem>
              <SettingLabel>Timezone:</SettingLabel> 
              <SettingContent>  
              <SettingText>Eastern Standard (EST)</SettingText>
              <EditButton>
                <img
                  src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/account/edit.webp"
                  alt=""
                />
              </EditButton>
              </SettingContent>  
            </SettingItem>
            <SettingItem>
              <SettingLabel>Currency:</SettingLabel> 
              <SettingContent>  
              <SettingText>Canadian Dollar ($ CAD)</SettingText>
              <EditButton>
                <img
                  src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/account/edit.webp"
                  alt=""
                />
              </EditButton>
              </SettingContent>  
            </SettingItem>
            <SettingItem>
              <SettingLabel>Calendar:</SettingLabel>
              <ViewButton>View</ViewButton>
            </SettingItem>
          </Section>

          <Section>
            <SectionHeader>Privacy & Security</SectionHeader>
            <SettingItem>
              <SettingLabel>Block User:</SettingLabel> 
              <LinkButton href="#">Search</LinkButton>
            </SettingItem>
            <SettingItem>
              <SettingLabel>2FA:</SettingLabel> 
              <LinkButton href="#">Set up 2FA</LinkButton>
            </SettingItem>
            {authType === "manual" && (
              <SettingItem>
                {!isChangingPassword ? (
                  <PasswordContainer>
                    <SettingLabel>Password:</SettingLabel> 
                    <SettingContent>
                    <SettingText>Change Password</SettingText>
                    <EditButton
                      className="edit-btn"
                      onClick={() => setIsChangingPassword(true)}
                    >
                      <img
                        src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/account/edit.webp"
                        alt="Change Password"
                      />
                    </EditButton>
                    </SettingContent>
                  </PasswordContainer>
      
                ) : (
                  <ChangePasswordFormWrapper>
                    <ChangePasswordForm />
                    <button
                      className="cancel-btn"
                      onClick={() => setIsChangingPassword(false)}
                    >
                      ✖
                    </button>
                  </ChangePasswordFormWrapper>
                )}
              </SettingItem>
            )}
          </Section>

          <Section>
            <SectionHeader>Purchases & Subscriptions</SectionHeader>
            <SettingItem>
              <LinkButton href="/my-account/settings/manage-subscriptions">
                Manage Subscription
              </LinkButton>
            </SettingItem>
            <SettingItem>
              <LinkButton href="/my-account/settings/purchase-history">
                Purchase History
              </LinkButton>
            </SettingItem>
          </Section>
        </Content>
      </SettingsContainer>

    </>
  );
};

export default Settings;

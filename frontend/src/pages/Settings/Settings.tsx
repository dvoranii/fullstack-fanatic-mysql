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
} from "./Settings.styled";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import { UserContext } from "../../context/UserContext";
import EditIcon from "../../assets/images/account/edit-icon.png";
import HelpIcon from "../../assets/images/help-icon.png";
import { getUserAuthType } from "../../services/userService";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";
import WarningBar from "../../components/WarningBar/WarningBar";

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
                <b>Current email:</b>
                {profile?.email}
                <div className="help-icon">
                  <img src={HelpIcon} alt="Help Icon" />
                  <span className="tooltip">
                    Users signed up via Google accounts cannot change their
                    emails
                  </span>
                </div>
              </SettingItem>
            ) : (
              <SettingItem>
                <b>Current email:</b> {profile?.email}
                <button className="edit-btn">
                  <img src={EditIcon} alt="Edit" />
                </button>
              </SettingItem>
            )}
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
            {authType === "manual" && (
              <SettingItem>
                {!isChangingPassword ? (
                  <PasswordContainer>
                    <b>Password:</b> <span>Change Password</span>
                    <button
                      className="edit-btn"
                      onClick={() => setIsChangingPassword(true)}
                    >
                      <img src={EditIcon} alt="Change Password" />
                    </button>
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
    </>
  );
};

export default Settings;

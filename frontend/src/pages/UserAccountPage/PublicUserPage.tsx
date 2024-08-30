import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {
  UserAccountContainer,
  ProfileBanner,
  ProfilePicture,
  UserName,
  UserProfession,
  AccountActivity,
  Section,
  SectionTitle,
  SectionContent,
  ViewAllButton,
  FavouriteIcon,
  CommentHistory,
  CommentItem,
  CommentText,
  CommentLink,
  ViewMoreCommentsButton,
  BannerWrapperInner,
  BannerWrapperOuter,
  ProfileContentWrapper,
  ProfileInfo,
  ProfilePlaceholder,
  BioContentWrapper,
  SocialSectionWrapper,
} from "./UserAccountPage.styled";
import GithubIcon from "../../assets/images/account/github-icon.png";
import IgIcon from "../../assets/images/account/ig-icon.png";
import linkedinIcon from "../../assets/images/account/linkedin-icon.png";
import TiktokIcon from "../../assets/images/account/tiktok-icon.png";
import XIcon from "../../assets/images/account/x-icon.png";
import InboxIcon from "../../assets/images/account/inbox.png";
import TutorialIcon from "../../assets/images/tutorial-icon.png";
import BlogIcon from "../../assets/images/blog-icon.png";
import { handleImageError } from "../../utils/imageUtils";
import { PublicProfile } from "../../types/PublicProfileType";

const PublicUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const loggedInUser = userContext?.profile?.id;

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loggedInUser && Number(id) && Number(id) === Number(loggedInUser)) {
      navigate("/my-account");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/users/user-profile/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();

        setProfile(data);
      } catch (error) {
        setError("Failed to load user profile");
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id, loggedInUser, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>User profile not found</p>;
  }

  return (
    <>
      <BannerWrapperOuter>
        <BannerWrapperInner>
          {/* do after user account page */}
          <ProfileBanner bannerimage={""}>
            <ProfileContentWrapper>
              <ProfilePicture
                src={profile.user.picture || ""}
                alt={`${profile.user.name}`}
                onError={handleImageError}
              />
              <ProfileInfo>
                <UserName>{profile.user.name || ""}</UserName>
                <UserProfession>Full Stack Developer</UserProfession>
              </ProfileInfo>
              <BioContentWrapper>
                <p>
                  <b>BIO:</b>
                </p>
                <p>
                  This is a public profile. Add user's bio or any relevant
                  public information here.
                </p>
              </BioContentWrapper>
              <SocialSectionWrapper>
                <p>Links</p>
                <ul>
                  <li>
                    <a href="#">
                      <img src={GithubIcon} alt="Github Logo" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={IgIcon} alt="Instagram Logo" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={linkedinIcon} alt="LinkedIn Logo" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={TiktokIcon} alt="Tik Tok Logo" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={XIcon} alt="X Logo" />
                    </a>
                  </li>
                </ul>
                <span>
                  <img src={InboxIcon} alt="" /> Inbox
                </span>
                <a href="">127 Connections</a>
              </SocialSectionWrapper>
            </ProfileContentWrapper>
          </ProfileBanner>
        </BannerWrapperInner>
      </BannerWrapperOuter>
      <ProfilePlaceholder />
      <UserAccountContainer>
        <AccountActivity>
          <Section>
            <SectionTitle>Favorites</SectionTitle>
            <SectionContent>
              <div>
                <FavouriteIcon>
                  <img src={TutorialIcon} alt="Tutorials" />
                </FavouriteIcon>
                <p>Tutorials</p>
                <ViewAllButton
                  onClick={() => console.log(profile.favouriteTutorials)}
                >
                  View All
                </ViewAllButton>
              </div>
              <div>
                <FavouriteIcon>
                  <img src={BlogIcon} alt="Tutorials" />
                </FavouriteIcon>
                <p>Blog Posts</p>
                <ViewAllButton
                  onClick={() => console.log(profile.favouriteBlogs)}
                >
                  View All
                </ViewAllButton>
              </div>
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Comment History</SectionTitle>
            <CommentHistory>
              {profile.comments?.map((comment) => (
                <CommentItem key={comment.id}>
                  <CommentText>{comment.content}</CommentText>
                  <CommentLink href="#">View Content</CommentLink>
                </CommentItem>
              ))}
              <ViewMoreCommentsButton>See More</ViewMoreCommentsButton>
            </CommentHistory>
          </Section>
        </AccountActivity>
      </UserAccountContainer>
    </>
  );
};

export default PublicUserPage;

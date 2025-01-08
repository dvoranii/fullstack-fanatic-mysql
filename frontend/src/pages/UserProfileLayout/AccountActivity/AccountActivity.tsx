import { Link } from "react-router-dom";
import {
  AccountActivityContainer,
  AccountActivityTitle,
  AccountActivityWrapperOuter,
  UserAccountContainer,
  Section,
  SectionTitle,
  CommentHistory,
  CommentItem,
  CommentText,
  CommentLink,
  ViewMoreCommentsLink,
} from "./AccountActivity.styled";
import FavoritesSection from "../FavoritesSection/FavoritesSection";
import { truncateText } from "../../../utils/textUtils";

interface AccountActivityProps {
  isOwnProfile: boolean;
  publicUserId: number | undefined;
  profileId: number;
  comments: Array<{
    id: number;
    content: string;
    content_type: string;
    content_id: number;
  }>;
}

const AccountActivity: React.FC<AccountActivityProps> = ({
  isOwnProfile,
  publicUserId,
  profileId,
  comments,
}) => {
  return (
    <>
      <AccountActivityTitle>Account Activity</AccountActivityTitle>
      <AccountActivityWrapperOuter>
        {isOwnProfile && (
          <Link to="/my-account/settings">
            <img
              src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/account/settings-gear.png"
              alt="settings gear"
              title="Settings"
              className="settings-gear"
            />
          </Link>
        )}

        <UserAccountContainer>
          <AccountActivityContainer>
            <Section className="favorites-section">
              <SectionTitle>Favorites</SectionTitle>
              <FavoritesSection
                isOwnProfile={isOwnProfile}
                publicUserId={publicUserId}
              />
            </Section>

            <Section>
              <SectionTitle>Comment History</SectionTitle>
              <CommentHistory>
                {comments.length === 0 ? (
                  <p className="no-comments">No comments available</p>
                ) : (
                  <>
                    {comments.slice(0, 5).map((comment) => (
                      <CommentItem key={comment.id}>
                        <CommentText>
                          {truncateText(comment.content, 50)}
                        </CommentText>
                        {comment.content_type === "tutorial" ? (
                          <CommentLink
                            href={`/tutorial/${comment.content_id}/comments/${comment.id}`}
                          >
                            View&nbsp;in&nbsp;Tutorial
                          </CommentLink>
                        ) : (
                          <CommentLink
                            href={`/blog/${comment.content_id}/comments/${comment.id}`}
                          >
                            View&nbsp;in&nbsp;Blog
                          </CommentLink>
                        )}
                      </CommentItem>
                    ))}

                    <ViewMoreCommentsLink
                      to={
                        isOwnProfile
                          ? "/my-account/comment-history"
                          : `/user/${profileId}/comment-history`
                      }
                    >
                      See All Comments
                    </ViewMoreCommentsLink>
                  </>
                )}
              </CommentHistory>
            </Section>
          </AccountActivityContainer>
        </UserAccountContainer>
      </AccountActivityWrapperOuter>
    </>
  );
};

export default AccountActivity;

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchUserComments } from "../../../services/commentService";
import {
  CommentItem,
  CommentText,
  CommentLink,
  ErrorMessage,
  CommentHistoryWrapper,
  CommentTextWrapper,
  CommentTimeCreation,
} from "./CommentHistory.styled";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { CommentType } from "../../../types/Comment/Comment";
import { PageWrapper } from "../../../PageWrapper.styled";
import { formatTimeAgo } from "../../../utils/timeUtils";
import { UserContext } from "../../../context/UserContext";
import TitleBanner from "../../../components/TitleBanner/TitleBanner";
import { truncateText } from "../../../utils/textUtils";

const BATCH_SIZE = 5;

export const CommentHistory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { profile } = useContext(UserContext) || {};
  const [comments, setComments] = useState<CommentType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const effectiveUserId = id ? Number(id) : profile?.id;

  useEffect(() => {
    if (effectiveUserId) {
      setPage(1);
      setComments([]);
      loadMoreComments(1);
    }
  }, [effectiveUserId]);

  const loadMoreComments = async (currentPage = page) => {
    try {
      if (!effectiveUserId) return;

      const { comments: userComments, hasMore: newHasMore } =
        await fetchUserComments(effectiveUserId, currentPage, BATCH_SIZE);

      setComments((prevComments) => [
        ...prevComments,
        ...userComments.filter(
          (newComment) => !prevComments.some((c) => c.id === newComment.id)
        ),
      ]);

      setHasMore(newHasMore ?? false);
      setPage(currentPage + 1);
    } catch (error) {
      setError("Failed to load comments.");
      console.error(error);
    }
  };

  if (!effectiveUserId) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <TitleBanner textContent="Comment History" />
      <PageWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <CommentHistoryWrapper id="scrollableDiv">
          <InfiniteScroll
            dataLength={comments.length}
            next={loadMoreComments}
            hasMore={hasMore}
            loader={<LoadingSpinner />}
            scrollableTarget="scrollableDiv"
          >
            {comments.map((comment, index) => (
              <CommentItem key={`${comment.id}-${index}`}>
                <CommentTextWrapper>
                  <CommentText>
                    {truncateText(comment.content, 100)}
                  </CommentText>
                  <CommentTimeCreation>
                    {formatTimeAgo(comment.created_at)}
                  </CommentTimeCreation>
                </CommentTextWrapper>

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
          </InfiniteScroll>
        </CommentHistoryWrapper>
      </PageWrapper>
    </>
  );
};

export default CommentHistory;

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchUserComments } from "../../../services/commentService";
import {
  CommentItem,
  CommentText,
  CommentLink,
  ErrorMessage,
  CommentHistoryWrapper,
  CommentHistoryTitleBanner,
  CommentTextWrapper,
  CommentTimeCreation,
} from "./CommentHistory.styled";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { CommentType } from "../../../types/Comment/Comment";
import { PageWrapper } from "../../../PageWrapper.styled";
import { formatTimeAgo } from "../../../utils/timeUtils";

const BATCH_SIZE = 5;

export const CommentHistory: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effect for initial load of comments
  useEffect(() => {
    setPage(0);
    loadMoreComments();
  }, []);

  const loadMoreComments = async () => {
    try {
      const { comments: userComments, hasMore: newHasMore } =
        await fetchUserComments(page, BATCH_SIZE);

      setComments((prevComments) => [
        ...prevComments,
        ...userComments.filter(
          (newComment) => !prevComments.some((c) => c.id === newComment.id)
        ),
      ]);

      setHasMore(newHasMore ?? false);
      setPage((prevPage) => prevPage + 1);

      console.log(userComments, newHasMore);
    } catch (error) {
      setError("Failed to load comments.");
      console.error(error);
    }
  };

  return (
    <>
      <CommentHistoryTitleBanner>
        <h2>Comment History</h2>
      </CommentHistoryTitleBanner>
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
                  <CommentText>{comment.content}</CommentText>
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

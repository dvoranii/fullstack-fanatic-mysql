import { useEffect, useState, useContext } from "react";
import ErrorMessage from "../Form/ErrorMessage";
import {
  CommentSectionWrapperOuter,
  CommentSectionWrapperInner,
  CommentSectionTitle,
  FormWrapper,
  FormTextArea,
  FormButton,
  SeeMoreButton,
  CommentTextareaWrapper,
  ProfilePictureWrapper,
  RepliesWrapper,
} from "./CommentSection.styled";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { CommentType } from "../../types/Comment/Comment";
import { CommentSectionProps } from "../../types/Comment/CommentSectionProps";
import {
  fetchTopLevelComments,
  fetchReplies,
  submitComment,
  updateComment,
  submitReply,
} from "../../services/commentService";
import Comment from "./Comment/Comment";
import { UserContext } from "../../context/UserContext";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useDeleteComment } from "../../hooks/useDeleteComment";
import {
  addRepliesToCommentTree,
  addReplyToComments,
} from "../../utils/commentUtils";

// for later use
const BATCH_SIZE = 5;

const CommentSection: React.FC<CommentSectionProps> = ({
  contentId,
  contentType,
  commentId,
}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { profile } = useContext(UserContext) || {};
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [visibleReplies, setVisibleReplies] = useState<{
    [commentId: number]: number;
  }>({});
  const [loadingTargetComment, setLoadingTargetComment] = useState(true);

  const { showDeleteModal, handleDelete, confirmDelete, cancelDelete } =
    useDeleteComment(setComments, setError);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const { comments: fetchedComments, hasMore: more } =
          await fetchTopLevelComments(contentType, contentId, page);

        setComments((prevComments) => [
          ...prevComments,
          ...fetchedComments.filter(
            (newComment) => !prevComments.some((c) => c.id === newComment.id)
          ),
        ]);
        setHasMore(more);

        if (commentId && !document.getElementById(`comment-${commentId}`)) {
          setPage((prevPage) => prevPage + 1);
        } else {
          setLoadingTargetComment(false);
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    if (loadingTargetComment) {
      loadComments();
    }
  }, [contentId, contentType, page, commentId, comments, loadingTargetComment]);

  useEffect(() => {
    if (commentId && !loadingTargetComment) {
      const targetComment = document.getElementById(`comment-${commentId}`);
      if (targetComment) {
        targetComment.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [comments, commentId, loadingTargetComment]);

  const loadMoreComments = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const { comments: fetchedComments, hasMore } =
          await fetchTopLevelComments(contentType, contentId, page);

        setComments((prevComments) => [
          ...prevComments,
          ...fetchedComments.filter(
            (newComment) => !prevComments.some((c) => c.id === newComment.id)
          ),
        ]);
        setHasMore(hasMore);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setError("Failed to fetch comments");
      }
    };

    fetchCommentsData();
  }, [contentId, contentType, page]);

  useEffect(() => {
    if (commentId && comments.length > 0) {
      const targetComment = document.getElementById(`comment-${commentId}`);
      if (targetComment) {
        targetComment.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [commentId, comments]);

  const handleReply = async (parentCommentId: number, replyContent: string) => {
    if (replyContent.trim() === "") return;

    try {
      const newReply = await submitReply({
        content_id: contentId,
        content_type: contentType,
        content: replyContent,
        parent_comment_id: parentCommentId,
      });

      setComments((prevComments) => addReplyToComments(prevComments, newReply));
    } catch (error) {
      console.error("Failed to submit reply", error);
      setError("Failed to submit reply");
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newComment.trim() === "") {
      setError("Comment cannot be empty");
      return;
    }

    try {
      const data = await submitComment(contentId, contentType, newComment);
      setComments((prevComments) => [data, ...prevComments]);
      setNewComment("");
      setError(null);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to submit comment");
    }
  };

  const handleEditCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedComment(e.target.value);
    if (error) {
      setError(null);
    }
  };

  const handleUpdate = async (id: number) => {
    if (editedComment.trim() === "") {
      setError("Comment cannot be empty");
      return;
    }

    const originalComment = comments.find((comment) => comment.id === id);

    if (!originalComment) {
      setError("Original comment not found.");
      return;
    }

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, content: editedComment } : comment
      )
    );

    setEditingCommentId(null);
    setEditedComment("");
    setError(null);

    try {
      await updateComment(id, editedComment);
    } catch (error) {
      console.error("Failed to update comment:", error);
      setError("Failed to update comment");

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? originalComment : comment
        )
      );
    }
  };

  const showMoreReplies = async (parentCommentId: number) => {
    const currentVisibleCount = visibleReplies[parentCommentId] || 0;

    try {
      const newReplies = await fetchReplies(
        parentCommentId,
        contentType,
        contentId,
        BATCH_SIZE,
        currentVisibleCount
      );

      console.log(newReplies);

      const repliesToAdd = Array.isArray(newReplies) ? newReplies : [];

      setComments((prevComments) =>
        addRepliesToCommentTree(prevComments, parentCommentId, repliesToAdd)
      );

      setVisibleReplies((prev) => ({
        ...prev,
        [parentCommentId]: currentVisibleCount + BATCH_SIZE,
      }));
    } catch (error) {
      console.error("Failed to fetch replies:", error);
    }
  };

  const renderComments = (
    comments: CommentType[],
    isReply = false,
    parentCommentId?: number
  ) => {
    return comments.map((comment, index) => {
      const replies = comment.replies || [];

      return (
        <div id={`comment-${comment.id}`} key={comment.id}>
          <Comment
            key={isReply ? `${parentCommentId}-${index}` : comment.id}
            comment={comment}
            isLiked={comment.likedByUser ?? false}
            isEditing={editingCommentId === comment.id}
            editedComment={editedComment}
            onEdit={() => {
              setEditingCommentId(comment.id);
              setEditedComment(comment.content);
            }}
            onDelete={() => handleDelete(comment.id)}
            onSave={handleUpdate}
            onCancelEdit={() => setEditingCommentId(null)}
            isReply={isReply}
            onReplySubmit={handleReply}
            handleEditChange={handleEditCommentChange}
          >
            {replies.length > 0 && (
              <RepliesWrapper>
                {renderComments(replies, true, comment.id)}
              </RepliesWrapper>
            )}

            {replies.length === 0 && comment.has_replies && (
              <SeeMoreButton onClick={() => showMoreReplies(comment.id)}>
                See more replies
              </SeeMoreButton>
            )}
          </Comment>
        </div>
      );
    });
  };

  return (
    <>
      <CommentSectionWrapperOuter>
        <CommentSectionTitle>Comments</CommentSectionTitle>
        {error && <ErrorMessage error={error} />}
        <CommentSectionWrapperInner id="scrollableDiv">
          <InfiniteScroll
            dataLength={comments.length}
            next={loadMoreComments}
            hasMore={hasMore || loadingTargetComment}
            loader={<LoadingSpinner />}
            scrollableTarget="scrollableDiv"
          >
            {renderComments(comments)}
          </InfiniteScroll>
        </CommentSectionWrapperInner>

        {showDeleteModal && (
          <DeleteConfirmationModal
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </CommentSectionWrapperOuter>
      {profile && (
        <CommentTextareaWrapper>
          <ProfilePictureWrapper>
            <ProfilePicture
              src={profile.profile_picture || ""}
              alt={""}
              width={"90px"}
              border={"3px solid rgba(0,0,0,0.4)"}
            />
          </ProfilePictureWrapper>

          <FormWrapper onSubmit={handleCommentSubmit}>
            <FormTextArea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add comment..."
            />
            <FormButton type="submit">Add Comment</FormButton>
          </FormWrapper>
        </CommentTextareaWrapper>
      )}
    </>
  );
};

export default CommentSection;

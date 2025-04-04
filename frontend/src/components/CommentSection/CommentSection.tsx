import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../Form/Message";
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
  fetchReplies,
  submitComment,
  updateComment,
  submitReply,
  fetchReplyAndParent,
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
  updateCommentInTree,
  findCommentById,
} from "../../utils/commentUtils";
import { useScrollToComment } from "../../hooks/useScrollToComment";
import { useLoadComments } from "../../hooks/useLoadComments";
import { useLoadInitialTopLevelComments } from "../../hooks/useLoadInitialTopLevelComments";
import { useCsrfToken } from "../../hooks/useCsrfToken";

const TOP_LEVEL_BATCH_SIZE = 5;
const REPLY_BATCH_SIZE = 3;

const CommentSection: React.FC<CommentSectionProps> = ({
  contentId,
  contentType,
  commentId: propCommentId,
}) => {
  const csrfToken = useCsrfToken();
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

  const { commentId: urlCommentId } = useParams<{ commentId: string }>();
  const numericCommentId = urlCommentId
    ? parseInt(urlCommentId, 10)
    : propCommentId;

  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const [loadingParentAndReply, setLoadingParentAndReply] = useState(true);

  const [allRepliesVisible, setAllRepliesVisible] = useState<{
    [parentCommentId: number]: boolean;
  }>({});

  useLoadComments({
    contentId,
    contentType,
    page,
    commentId: numericCommentId,
    TOP_LEVEL_BATCH_SIZE,
    comments,
    loadingTargetComment,
    setComments,
    setHasMore,
    setPage,
    setLoadingTargetComment,
  });

  useLoadInitialTopLevelComments({
    contentId,
    contentType,
    page,
    TOP_LEVEL_BATCH_SIZE,
    setComments,
    setHasMore,
    setError,
  });

  const waitForElementAndScroll = (
    elementId: string,
    attempts = 5,
    interval = 300
  ) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (attempts > 0) {
      setTimeout(() => {
        waitForElementAndScroll(elementId, attempts - 1, interval);
      }, interval);
    }
  };

  // 
  const loadRepliesUntilTarget = async (
    parentId: number,
    targetId: number,
    currentOffset: number = 0
  ): Promise<boolean> => {
    try {
      const { comments: newReplies, hasMore } = await fetchReplies(
        parentId,
        contentType,
        contentId,
        REPLY_BATCH_SIZE,
        currentOffset
      );
  
      // Update state with new replies
      setComments(prev => addRepliesToCommentTree(prev, parentId, newReplies));
      setVisibleReplies(prev => ({
        ...prev,
        [parentId]: (prev[parentId] || 0) + newReplies.length
      }));
  
      // Check if target exists in this batch
      const found = newReplies.some(reply => reply.id === targetId);
      
      if (found) return true;
      if (hasMore) return loadRepliesUntilTarget(parentId, targetId, currentOffset + REPLY_BATCH_SIZE);
      
      return false;
    } catch (error) {
      console.error("Reply loading failed:", error);
      return false;
    }
  };
  

  useEffect(() => {
    if (!numericCommentId) return;

    const loadReplyAndParent = async () => {
      try {
        const { parentChain, topLevelComment } = await fetchReplyAndParent(
          Number(numericCommentId)
        );

        for (let i = parentChain.length - 1; i >= 0; i--) {
          const parentId = parentChain[i].id;
          const nextParentId = parentChain[i - 1]?.id;
          
          if (nextParentId) {
            await loadRepliesUntilTarget(parentId, nextParentId);
          } else {
            await loadRepliesUntilTarget(parentId, numericCommentId);
          }
        }
    
        setParentCommentId(topLevelComment.id);
        setLoadingParentAndReply(false);

        setLoadingTargetComment(false);
        setHasMore(true);
        
        waitForElementAndScroll(`comment-${numericCommentId}`, 10, 300);
      } catch (error) {
        console.error("Failed to load reply chain:", error);
      }
    };

    loadReplyAndParent();
  }, [numericCommentId]);

  useScrollToComment(parentCommentId, comments, loadingParentAndReply);

  const loadMoreComments = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleReply = async (parentCommentId: number, replyContent: string) => {
    if (replyContent.trim() === "") return;

    try {
      const newReply = await submitReply(
        {
          content_id: contentId,
          content_type: contentType,
          content: replyContent,
          parent_comment_id: parentCommentId,
        },
        csrfToken
      );

      setComments((prevComments) => {
        const updatedComments = addReplyToComments(prevComments, newReply);
        return updatedComments.map((comment) =>
          comment.id === parentCommentId
            ? {
                ...comment,
                hasMoreReplies: false,
                has_replies: true,
              }
            : comment
        );
      });

      setAllRepliesVisible((prev) => ({ ...prev, [parentCommentId]: true }));
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
      const data = await submitComment(
        contentId,
        contentType,
        newComment,
        csrfToken
      );
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

    const originalComment = findCommentById(comments, id);

    if (!originalComment) {
      setError("Original comment not found.");
      return;
    }

    setComments((prevComments) =>
      prevComments.map((comment) =>
        updateCommentInTree(comment, id, editedComment)
      )
    );

    setEditingCommentId(null);
    setEditedComment("");
    setError(null);

    try {
      await updateComment(id, editedComment, csrfToken);
    } catch (error) {
      console.error("Failed to update comment:", error);
      setError("Failed to update comment");

      setComments((prevComments) =>
        prevComments.map((comment) =>
          updateCommentInTree(comment, id, originalComment.content)
        )
      );
    }
  };

  const showMoreReplies = async (
    parentCommentId: number,
    callback?: () => void
  ) => {
    const currentVisibleCount = visibleReplies[parentCommentId] || 0;

    try {
      const { comments: newReplies, hasMore } = await fetchReplies(
        parentCommentId,
        contentType,
        contentId,
        REPLY_BATCH_SIZE,
        currentVisibleCount
      );

      const repliesToAdd = Array.isArray(newReplies) ? newReplies : [];

      setComments((prevComments) =>
        addRepliesToCommentTree(prevComments, parentCommentId, repliesToAdd)
      );

      setVisibleReplies((prev) => ({
        ...prev,
        [parentCommentId]: currentVisibleCount + repliesToAdd.length,
      }));

      if (!hasMore) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === parentCommentId
              ? { ...comment, hasMoreReplies: false }
              : comment
          )
        );
      }

      if (callback) {
        callback();
      }
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

            {comment.has_replies &&
              comment.hasMoreReplies &&
              !allRepliesVisible[comment.id] && (
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
        {error && <ErrorMessage message={error} />}
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
            message={"Are you sure you want to delete this comment?"}
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

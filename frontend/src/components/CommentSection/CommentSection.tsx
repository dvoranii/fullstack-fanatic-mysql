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
} from "./CommentSection.styled";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { CommentType } from "../../types/Comment/Comment";
import { CommentSectionProps } from "../../types/Comment/CommentSectionProps";
import {
  fetchComments,
  submitComment,
  updateComment,
  deleteComment,
  submitReply,
} from "../../services/commentService";
import Comment from "./Comment/Comment";
import { UserContext } from "../../context/UserContext";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

const BATCH_SIZE = 5;

const CommentSection: React.FC<CommentSectionProps> = ({
  contentId,
  contentType,
}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const { profile } = useContext(UserContext) || {};

  const [visibleReplies, setVisibleReplies] = useState<{
    [commentId: number]: number;
  }>({});

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const data = await fetchComments(contentType, contentId);
        setComments(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch comments");
      }
    };

    fetchCommentsData();
  }, [contentId, contentType]);

  const handleReply = async (parentCommentId: number, replyContent: string) => {
    if (replyContent.trim() === "") return;

    try {
      const newReply = await submitReply({
        content_id: contentId,
        content_type: contentType,
        content: replyContent,
        parent_comment_id: parentCommentId,
      });

      // Recursive function to add the new reply to the correct parent comment
      const addReplyToComments = (comments: CommentType[]): CommentType[] => {
        return comments.map((comment) => {
          if (comment.id === parentCommentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          } else if (comment.replies) {
            return {
              ...comment,
              replies: addReplyToComments(comment.replies),
            };
          } else {
            return comment;
          }
        });
      };

      setComments((prevComments) => addReplyToComments(prevComments));
    } catch (error) {
      console.error("Failed to submit reply", error);
      setError("Failed to submit reply");
    }
  };

  // fetch more replies

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

  // const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setNewComment(e.target.value);
  //   if (error) {
  //     setError(null);
  //   }
  // };

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

    try {
      const data = await updateComment(id, editedComment);
      setComments(
        comments.map((comment) => (comment.id === id ? data : comment))
      );
      setEditingCommentId(null);
      setEditedComment("");
      setError(null);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to update comment");
    }
  };

  const handleDelete = (id: number) => {
    setShowDeleteModal(true);
    setCommentToDelete(id);
  };

  const confirmDelete = async () => {
    if (commentToDelete !== null) {
      try {
        await deleteComment(commentToDelete);

        setComments((prevComments) => {
          const removeCommentById = (
            comments: CommentType[],
            id: number
          ): CommentType[] => {
            return comments
              .filter((comment) => comment.id !== id)
              .map((comment) => ({
                ...comment,
                replies: removeCommentById(comment.replies || [], id),
              }));
          };

          return removeCommentById(prevComments, commentToDelete);
        });

        setShowDeleteModal(false);
        setCommentToDelete(null);
      } catch (error) {
        console.error("Fetch error: ", error);
        setError("Failed to delete comment");
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCommentToDelete(null);
  };

  const showMoreReplies = (commentId: number) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 1) + BATCH_SIZE,
    }));
  };

  const renderComments = (comments: CommentType[], isReply = false) => {
    return comments.map((comment) => {
      const visibleRepliesCount = visibleReplies[comment.id] || 1;

      return (
        <Comment
          key={comment.id}
          comment={comment}
          isEditing={editingCommentId === comment.id}
          editedComment={editedComment}
          handleEditChange={handleEditCommentChange}
          onEdit={() => {
            setEditingCommentId(comment.id);
            setEditedComment(comment.content);
          }}
          onDelete={() => handleDelete(comment.id)}
          onSave={handleUpdate}
          onCancelEdit={() => setEditingCommentId(null)}
          isReply={isReply}
          onReplySubmit={handleReply}
        >
          {comment.replies && comment.replies.length > 0 && (
            <div style={{ marginLeft: "2rem", marginTop: "0.5rem" }}>
              {renderComments(
                comment.replies.slice(0, visibleRepliesCount),
                true
              )}

              {comment.replies.length > visibleRepliesCount && (
                <SeeMoreButton onClick={() => showMoreReplies(comment.id)}>
                  See more replies
                </SeeMoreButton>
              )}
            </div>
          )}
        </Comment>
      );
    });
  };

  return (
    <CommentSectionWrapperOuter>
      <CommentSectionTitle>Comments</CommentSectionTitle>
      {error && <ErrorMessage error={error} />}
      <CommentSectionWrapperInner>
        {renderComments(comments)}
      </CommentSectionWrapperInner>
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
      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </CommentSectionWrapperOuter>
  );
};

export default CommentSection;

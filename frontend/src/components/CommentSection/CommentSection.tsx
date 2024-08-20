import { useEffect, useState, useContext } from "react";
import ErrorMessage from "../Form/ErrorMessage";
import {
  CommentSectionWrapperOuter,
  CommentSectionWrapperInner,
  CommentSectionTitle,
  FormWrapper,
  FormTextArea,
  FormButton,
} from "./CommentSection.styled";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { CommentType } from "../../types/Comment";
import { CommentSectionProps } from "../../types/CommentSectionProps";
import {
  fetchComments,
  submitComment,
  updateComment,
  deleteComment,
} from "../../services/commentService";
import Comment from "./Comment/Comment";
import { UserContext } from "../../context/UserContext";

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

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newComment.trim() === "") {
      setError("Comment cannot be empty");
      return;
    }

    try {
      const data = await submitComment(contentId, contentType, newComment);
      setComments([...comments, data]);
      setNewComment("");
      setError(null);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to submit comment");
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
    if (error) {
      setError(null);
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
        setComments(
          comments.filter((comment) => comment.id !== commentToDelete)
        );
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

  return (
    <CommentSectionWrapperOuter>
      <CommentSectionTitle>Comments</CommentSectionTitle>
      {error && <ErrorMessage error={error} />}
      <CommentSectionWrapperInner>
        {comments.map((comment) => (
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
          />
        ))}
      </CommentSectionWrapperInner>
      {profile && (
        <FormWrapper onSubmit={handleCommentSubmit}>
          <FormTextArea value={newComment} onChange={handleCommentChange} />
          <FormButton type="submit">Add Comment</FormButton>
        </FormWrapper>
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

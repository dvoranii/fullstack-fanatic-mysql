import { useState } from "react";
import { deleteComment } from "../services/commentService";
import { CommentType } from "../types/Comment/Comment";
import { useCsrfToken } from "./useCsrfToken";

export const useDeleteComment = (
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const csrfToken = useCsrfToken();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setShowDeleteModal(true);
    setCommentToDelete(id);
  };

  const confirmDelete = async () => {
    if (commentToDelete !== null) {
      try {
        await deleteComment(commentToDelete, csrfToken);
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
        console.error("Failed to delete comment:", error);
        setError("Failed to delete comment");
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCommentToDelete(null);
  };

  return {
    showDeleteModal,
    handleDelete,
    confirmDelete,
    cancelDelete,
  };
};

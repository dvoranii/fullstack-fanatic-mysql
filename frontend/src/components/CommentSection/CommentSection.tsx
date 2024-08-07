import React, { useEffect, useState } from "react";
import ErrorMessage from "../Form/ErrorMessage";
import {
  CommentSectionWrapperOuter,
  CommentSectionWrapperInner,
  CommentItem,
  CommentWrapper,
  LikesWrapper,
  FormWrapper,
  FormButton,
  FormTextArea,
  CommentSectionTitle,
  CommentContentWrapper,
  CommentButtonsWrapper,
} from "./CommentSection.styled";
import like1 from "../../assets/images/like-1.png";
import like2 from "../../assets/images/like-2.png";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

interface Comment {
  id: number;
  content_id: number;
  content_type: "tutorial" | "blog";
  content: string;
  created_at: string;
  likes: number;
}

interface CommentSectionProps {
  contentId: number;
  contentType: "tutorial" | "blog";
}

const CommentSection: React.FC<CommentSectionProps> = ({
  contentId,
  contentType,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/comments/${contentType}/${contentId}`)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Comment[]) => setComments(data))
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch comments");
      });
  }, [contentId, contentType]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newComment.trim() === "") {
      setError("Comment cannot be empty");
      return;
    }

    fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content_id: contentId,
        content_type: contentType,
        content: newComment,
      }),
    })
      .then((response) => response.json())
      .then((data: Comment) => {
        setComments([...comments, data]);
        setNewComment("");
        setError(null);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to submit comment");
      });
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

  const handleUpdate = (id: number) => {
    if (editedComment.trim() === "") {
      setError("Comment cannot be empty");
      return;
    }

    fetch(`/api/comments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: editedComment }),
    })
      .then((response) => response.json())
      .then((data: Comment) => {
        setComments(
          comments.map((comment) => (comment.id === id ? data : comment))
        );
        setEditingCommentId(null);
        setEditedComment("");
        setError(null);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to update comment");
      });
  };

  const handleDelete = (id: number) => {
    setShowDeleteModal(true);
    setCommentToDelete(id);
  };

  const confirmDelete = () => {
    if (commentToDelete !== null) {
      fetch(`/api/comments/${commentToDelete}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          setComments(
            comments.filter((comment) => comment.id !== commentToDelete)
          );
          setShowDeleteModal(false);
          setCommentToDelete(null);
        })
        .catch((error) => {
          console.error("Fetch error: ", error);
          setError("Failed to delete comment");
        });
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCommentToDelete(null);
  };

  const handleLike = (id: number) => {
    fetch(`/api/comments/${id}/toggle-like`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(
          comments.map((comment) =>
            comment.id === id ? { ...comment, likes: data.likes } : comment
          )
        );
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to toggle like");
      });
  };

  return (
    <CommentSectionWrapperOuter>
      <CommentSectionTitle>Comments</CommentSectionTitle>
      {error && <ErrorMessage error={error} />}
      <CommentSectionWrapperInner>
        {comments.map((comment) => (
          <CommentWrapper key={comment.id}>
            <CommentItem>
              {editingCommentId === comment.id ? (
                <>
                  <FormTextArea
                    value={editedComment}
                    onChange={handleEditCommentChange}
                  />

                  <CommentButtonsWrapper>
                    <FormButton onClick={() => handleUpdate(comment.id)}>
                      Save
                    </FormButton>
                    <FormButton onClick={() => setEditingCommentId(null)}>
                      Cancel
                    </FormButton>
                  </CommentButtonsWrapper>
                </>
              ) : (
                <>
                  <CommentContentWrapper>
                    {comment.content}
                  </CommentContentWrapper>

                  <CommentButtonsWrapper>
                    <FormButton
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditedComment(comment.content);
                      }}
                    >
                      Edit
                    </FormButton>
                    <FormButton onClick={() => handleDelete(comment.id)}>
                      Delete
                    </FormButton>
                  </CommentButtonsWrapper>
                </>
              )}
            </CommentItem>
            <LikesWrapper>
              <img
                src={comment.likes % 2 === 1 ? like2 : like1}
                alt="like icon"
                onClick={() => handleLike(comment.id)}
              />
              {comment.likes}
            </LikesWrapper>
          </CommentWrapper>
        ))}
      </CommentSectionWrapperInner>
      <FormWrapper onSubmit={handleCommentSubmit}>
        <FormTextArea value={newComment} onChange={handleCommentChange} />
        <FormButton type="submit">Add Comment</FormButton>
      </FormWrapper>
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

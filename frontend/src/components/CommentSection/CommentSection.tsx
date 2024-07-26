import React, { useEffect, useState } from "react";
import { ErrorMessage } from "../ErrorMessage.styled";
import {
  CommentSectionWrapperOuter,
  CommentSectionWrapperInner,
  Comment,
  CommentWrapper,
  LikesWrapper,
  FormWrapper,
  FormButton,
  FormTextArea,
  CommentSectionTitle,
  CommentContentWrapper,
  CommentButtonsWrapper,
} from "./CommentSection.styled";
import likeIcon from "../../assets/images/like-icon.png";
// import LikeIcon from "../../assets/images/like-icon.png";

interface Comment {
  id: number;
  tutorial_id: number;
  content: string;
  created_at: string;
  likes: number;
}

interface CommentSectionProps {
  tutorialId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ tutorialId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/comments/${tutorialId}`)
      .then((response) => response.json())
      .then((data: Comment[]) => setComments(data));
  }, [tutorialId]);

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
      body: JSON.stringify({ tutorial_id: tutorialId, content: newComment }),
    })
      .then((response) => response.json())
      .then((data: Comment) => {
        setComments([...comments, data]);
        setNewComment("");
        setError(null);
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
      });
  };

  const handleDelete = (id: number) => {
    fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== id));
      });
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
      });
  };

  return (
    <CommentSectionWrapperOuter>
      <CommentSectionTitle>Comments</CommentSectionTitle>
      <CommentSectionWrapperInner>
        {comments.map((comment) => (
          <CommentWrapper>
            <Comment key={comment.id}>
              {editingCommentId === comment.id ? (
                <>
                  <FormTextArea
                    value={editedComment}
                    onChange={handleEditCommentChange}
                  />
                  <FormButton onClick={() => handleUpdate(comment.id)}>
                    Save
                  </FormButton>
                  <FormButton onClick={() => setEditingCommentId(null)}>
                    Cancel
                  </FormButton>
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
            </Comment>
            <LikesWrapper>
              {" "}
              <img
                src={likeIcon}
                alt="like icon"
                onClick={() => handleLike(comment.id)}
                className={comment.likes % 2 === 1 ? "liked" : "unliked"}
              />
              {comment.likes}
            </LikesWrapper>
          </CommentWrapper>
        ))}
      </CommentSectionWrapperInner>
      <FormWrapper onSubmit={handleCommentSubmit}>
        <FormTextArea value={newComment} onChange={handleCommentChange} />
        <FormButton type="submit">Add Comment</FormButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormWrapper>
    </CommentSectionWrapperOuter>
  );
};

export default CommentSection;

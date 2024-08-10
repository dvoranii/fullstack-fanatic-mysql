import { CommentType } from "../types/Comment";

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const fetchComments = async (
  contentType: string,
  contentId: number
): Promise<CommentType[]> => {
  const response = await fetch(`/api/comments/${contentType}/${contentId}`);
  if (!response.ok) throw new Error("Failed to fetch comments");
  const data = await response.json();
  return data;
};

export const submitComment = async (
  contentId: number,
  contentType: string,
  newComment: string
): Promise<CommentType> => {
  const response = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({
      content_id: contentId,
      content_type: contentType,
      content: newComment,
    }),
  });
  if (!response.ok) throw new Error("Failed to submit comment");
  const data = await response.json();
  return data;
};

export const updateComment = async (
  id: number,
  editedComment: string
): Promise<CommentType> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({ content: editedComment }),
  });
  if (!response.ok) throw new Error("Failed to update comment");
  const data = await response.json();
  return data;
};

export const deleteComment = async (id: number): Promise<void> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete comment");
};

export const toggleLike = async (id: number): Promise<number> => {
  const response = await fetch(`/api/comments/${id}/toggle-like`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) throw new Error("Failed to toggle like");
  const data = await response.json();
  return data.likes;
};

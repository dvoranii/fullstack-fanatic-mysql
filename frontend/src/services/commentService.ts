import { CommentType } from "../types/Comment";
import { handleTokenExpiration } from "./tokenService";

export const fetchComments = async (
  contentType: string,
  contentId: number
): Promise<CommentType[]> => {
  const token = await handleTokenExpiration();
  const url = `/api/comments/${contentType}/${contentId}?includeLikedStatus=true`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch comments");
  const data = await response.json();

  return data as CommentType[];
};

export const submitComment = async (
  contentId: number,
  contentType: string,
  newComment: string
): Promise<CommentType> => {
  const token = await handleTokenExpiration();
  const response = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

export const submitReply = async ({
  content_id,
  content_type,
  content,
  parent_comment_id,
}: {
  content_id: number;
  content_type: "tutorial" | "blog";
  content: string;
  parent_comment_id: number;
}) => {
  const token = await handleTokenExpiration();
  const res = await fetch("http://localhost:5000/api/comments/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content_id,
      content_type,
      content,
      parent_comment_id,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
};

export const updateComment = async (
  id: number,
  editedComment: string
): Promise<CommentType> => {
  const token = await handleTokenExpiration();
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content: editedComment }),
  });
  if (!response.ok) throw new Error("Failed to update comment");
  const data = await response.json();
  return data;
};

export const deleteComment = async (id: number): Promise<void> => {
  const token = await handleTokenExpiration();
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete comment");
};

export const toggleLike = async (id: number): Promise<number> => {
  const token = await handleTokenExpiration();
  const response = await fetch(`/api/comments/${id}/toggle-like`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to toggle like");
  const data = await response.json();
  return data.likes;
};

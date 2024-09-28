import { CommentType } from "../types/Comment/Comment";
import { apiCall } from "../utils/apiUtils";

export const fetchComments = async (
  contentType: string,
  contentId: number
): Promise<CommentType[]> => {
  const endpoint = `/api/comments/${contentType}/${contentId}?includeLikedStatus=true`;

  const { data } = await apiCall<CommentType[]>(endpoint);

  return data;
};

export const submitComment = async (
  contentId: number,
  contentType: string,
  newComment: string
): Promise<CommentType> => {
  const endpoint = `/api/comments`;

  // Destructure `data` from the response
  const { data } = await apiCall<CommentType>(endpoint, {
    method: "POST",
    body: JSON.stringify({
      content_id: contentId,
      content_type: contentType,
      content: newComment,
    }),
  });

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
}): Promise<CommentType> => {
  const endpoint = `/api/comments/reply`;

  const { data } = await apiCall<CommentType>(endpoint, {
    method: "POST",
    body: JSON.stringify({
      content_id,
      content_type,
      content,
      parent_comment_id,
    }),
  });

  return data;
};

export const updateComment = async (
  id: number,
  editedComment: string
): Promise<CommentType> => {
  const endpoint = `/api/comments/${id}`;

  const { data } = await apiCall<CommentType>(endpoint, {
    method: "PUT",
    body: JSON.stringify({ content: editedComment }),
  });

  return data;
};

export const deleteComment = async (id: number): Promise<void> => {
  const endpoint = `/api/comments/${id}`;

  await apiCall<void>(endpoint, {
    method: "DELETE",
  });
};

export const toggleLike = async (id: number): Promise<number> => {
  const endpoint = `/api/comments/${id}/toggle-like`;

  const { data } = await apiCall<{ likes: number }>(endpoint, {
    method: "PUT",
  });

  return data.likes;
};

export const fetchCommentsWithParams = async ({
  contentType,
  contentId,
  parentCommentId = null,
  limit = 5,
  offset = 0,
}: {
  contentType: string;
  contentId: number;
  parentCommentId?: number | null;
  limit?: number;
  offset?: number;
}): Promise<CommentType[]> => {
  let endpoint = `/api/comments/${contentType}/${contentId}?limit=${limit}&offset=${offset}`;
  if (parentCommentId) {
    endpoint += `&parentCommentId=${parentCommentId}`;
  }

  const { data } = await apiCall<CommentType[]>(endpoint);
  return data;
};

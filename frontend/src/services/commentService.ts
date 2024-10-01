import { CommentType } from "../types/Comment/Comment";
import { apiCall } from "../utils/apiUtils";

// Fetch top-level comments (parent_comment_id IS NULL)
export const fetchTopLevelComments = async (
  contentType: string,
  contentId: number,
  page: number
): Promise<{ comments: CommentType[]; hasMore: boolean }> => {
  const endpoint = `/api/comments/${contentType}/${contentId}?page=${page}&parentCommentId=null&includeLikedStatus=true`;

  const { data } = await apiCall<{ comments: CommentType[]; hasMore: boolean }>(
    endpoint
  );

  console.log(data);
  return data;
};

// Fetch replies for a specific comment (based on parent_comment_id)
export const fetchReplies = async (
  parentCommentId: number,
  contentType: string,
  contentId: number,
  limit: number,
  offset: number
): Promise<CommentType[]> => {
  // Hit the same route used for fetching comments but pass parentCommentId to get replies
  const endpoint = `/api/comments/${contentType}/${contentId}?parentCommentId=${parentCommentId}&limit=${limit}&offset=${offset}`;
  const { data } = await apiCall<{ comments: CommentType[] }>(endpoint);

  // Return the comments (which are actually replies in this case)
  return data.comments || [];
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

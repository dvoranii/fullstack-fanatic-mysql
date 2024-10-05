import { CommentType } from "../types/Comment/Comment";
import { apiCall } from "../utils/apiUtils";

export const fetchTopLevelComments = async (
  contentType: string,
  contentId: number,
  page: number
): Promise<{ comments: CommentType[]; hasMore: boolean }> => {
  const endpoint = `/api/comments/${contentType}/${contentId}?page=${page}&parentCommentId=null&includeLikedStatus=true`;

  const { data } = await apiCall<{ comments: CommentType[]; hasMore: boolean }>(
    endpoint
  );

  return data;
};

export const fetchReplies = async (
  parentCommentId: number,
  contentType: string,
  contentId: number,
  limit: number,
  offset: number
): Promise<CommentType[]> => {
  const endpoint = `/api/comments/${contentType}/${contentId}?parentCommentId=${parentCommentId}&limit=${limit}&offset=${offset}&includeLikedStatus=true`;
  const { data } = await apiCall<{ comments: CommentType[] }>(endpoint);

  console.log(data);
  return data.comments || [];
};

export const submitComment = async (
  contentId: number,
  contentType: string,
  newComment: string
): Promise<CommentType> => {
  const endpoint = `/api/comments`;

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

export const fetchUserComments = async (
  page?: number,
  limit?: number
): Promise<{ comments: CommentType[]; hasMore?: boolean }> => {
  let endpoint = `/api/comments/user`;

  if (page !== undefined && limit !== undefined) {
    endpoint += `?page=${page}&limit=${limit}`;
  }

  const { data } = await apiCall<{
    comments: CommentType[];
    hasMore?: boolean;
  }>(endpoint, { method: "GET" });

  return {
    comments: data.comments,
    hasMore: data.hasMore,
  };
};

export const fetchAllComments = async (): Promise<CommentType[]> => {
  const endpoint = `/api/comments/all-comments`;

  try {
    const { data } = await apiCall<{
      comments: CommentType[];
    }>(endpoint, {
      method: "GET",
    });

    console.log(data);
    return data.comments;
  } catch (error) {
    console.error("Error fetching all comments:", error);
    throw new Error("Failed to fetch all comments");
  }
};

fetchAllComments();

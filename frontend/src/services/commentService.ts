import { CommentType } from "../types/Comment/Comment";
import { apiCall } from "../utils/apiUtils";

export const fetchTopLevelComments = async (
  contentType: string,
  contentId: number,
  page: number,
  limit: number
): Promise<{ comments: CommentType[]; hasMore: boolean }> => {
  const endpoint = `/comments/${contentType}/${contentId}?page=${page}&parentCommentId=null&limit=${limit}&includeLikedStatus=true`;

  const { data } = await apiCall<{ comments: CommentType[]; hasMore: boolean }>(
    endpoint
  );

  const commentsWithHasMoreReplies = data.comments.map((comment) => ({
    ...comment,
    hasMoreReplies: comment.has_replies,
  }));

  return {
    comments: commentsWithHasMoreReplies,
    hasMore: data.hasMore,
  };
};

export const fetchReplies = async (
  parentCommentId: number,
  contentType: string,
  contentId: number,
  limit: number,
  offset: number
): Promise<{ comments: CommentType[]; hasMore: boolean }> => {
  const endpoint = `/comments/${contentType}/${contentId}?parentCommentId=${parentCommentId}&limit=${limit}&offset=${offset}&includeLikedStatus=true`;

  const { data } = await apiCall<{
    hasMore: boolean;
    comments: CommentType[];
  }>(endpoint);

  return {
    comments: data.comments || [],
    hasMore: data.hasMore,
  };
};

export const submitComment = async (
  contentId: number,
  contentType: string,
  newComment: string,
  csrfToken: string
): Promise<CommentType> => {
  const endpoint = `/comments`;

  const { data } = await apiCall<CommentType>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      content_id: contentId,
      content_type: contentType,
      content: newComment,
    }),
    headers: {
      "x-csrf-token": csrfToken,
    },
  });

  return data;
};

export const submitReply = async (
  {
    content_id,
    content_type,
    content,
    parent_comment_id,
  }: {
    content_id: number;
    content_type: "tutorial" | "blog";
    content: string;
    parent_comment_id: number;
  },
  csrfToken: string
): Promise<CommentType> => {
  const endpoint = `/comments/reply`;

  const { data } = await apiCall<CommentType>(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      content_id,
      content_type,
      content,
      parent_comment_id,
    }),
    headers: {
      "x-csrf-token": csrfToken,
    },
  });

  return data;
};

export const updateComment = async (
  id: number,
  editedComment: string,
  csrfToken: string
): Promise<CommentType> => {
  const endpoint = `/comments/${id}`;

  const { data } = await apiCall<CommentType>(endpoint, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({ content: editedComment }),
    headers: {
      "x-csrf-token": csrfToken,
    },
  });

  return data;
};

export const deleteComment = async (
  id: number,
  csrfToken: string
): Promise<void> => {
  const endpoint = `/comments/${id}`;

  await apiCall<void>(endpoint, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "x-csrf-token": csrfToken,
    },
  });
};

export const toggleLike = async (
  id: number,
  csrfToken: string
): Promise<number> => {
  const endpoint = `/comments/${id}/toggle-like`;

  const { data } = await apiCall<{ likes: number }>(endpoint, {
    method: "PUT",
    credentials: "include",
    headers: {
      "x-csrf-token": csrfToken,
    },
  });

  return data.likes;
};

export const fetchUserComments = async (
  userId?: number,
  page?: number,
  limit?: number
): Promise<{ comments: CommentType[]; hasMore?: boolean }> => {
  let endpoint = userId
    ? `/comments/users/${userId}/comment-history`
    : `/comments/users`;

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

export const fetchReplyAndParent = async (
  id: number
): Promise<CommentType[]> => {
  let endpoint = `/comments/reply-and-parent`;

  if (id) {
    endpoint += `?id=${id}`;
  }

  try {
    const { data } = await apiCall<{
      initialComment: CommentType;
      topLevelComment: CommentType;
    }>(endpoint, {
      method: "GET",
    });

    return [data.initialComment, data.topLevelComment];
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Failed to fetch comments");
  }
};

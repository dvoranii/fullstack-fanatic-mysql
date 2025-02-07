import { CommentType } from "../types/Comment/Comment";

export const addReplyToComments = (
  comments: CommentType[],
  newReply: CommentType
): CommentType[] => {
  return comments.map((comment) => {
    if (comment.id === newReply.parent_comment_id) {
      return {
        ...comment,
        replies: [...(comment.replies || []), newReply],
        has_replies: true,
        hasMoreReplies: false
      };
    }
    
    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: addReplyToComments(comment.replies, newReply),
      };
    }
    
    return comment;
  });
};

export const addRepliesToCommentTree = (
  comments: CommentType[],
  parentCommentId: number,
  newReplies: CommentType[]
): CommentType[] => {
  return comments.map((comment) => {
    const replies = comment.replies || [];

    if (comment.id === parentCommentId) {
      const updatedReplies = [
        ...replies.filter(
          (existingReply) =>
            !newReplies.some((newReply) => newReply.id === existingReply.id)
        ),
        ...newReplies,
      ];

      return {
        ...comment,
        replies: updatedReplies,
      };
    }

    if (replies.length > 0) {
      return {
        ...comment,
        replies: addRepliesToCommentTree(replies, parentCommentId, newReplies),
      };
    }

    return comment;
  });
};

export const updateCommentInTree = (
  comment: CommentType,
  id: number,
  newContent: string
): CommentType => {
  if (comment.id === id) {
    return { ...comment, content: newContent };
  }

  if (comment.replies && comment.replies.length > 0) {
    return {
      ...comment,
      replies: comment.replies.map((reply) =>
        updateCommentInTree(reply, id, newContent)
      ),
    };
  }

  return comment;
};

export const findCommentById = (
  comments: CommentType[],
  id: number
): CommentType | null => {
  for (const comment of comments) {
    if (comment.id === id) {
      return comment;
    }
    if (comment.replies && comment.replies.length > 0) {
      const foundReply = findCommentById(comment.replies, id);
      if (foundReply) {
        return foundReply;
      }
    }
  }
  return null;
};

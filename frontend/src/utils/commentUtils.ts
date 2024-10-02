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
      };
    } else if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: addReplyToComments(comment.replies, newReply),
      };
    } else {
      return comment;
    }
  });
};

export const addRepliesToCommentTree = (
  comments: CommentType[],
  parentId: number,
  replies: CommentType[]
): CommentType[] => {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...(comment.replies || []), ...replies],
      };
    }

    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: addRepliesToCommentTree(comment.replies, parentId, replies),
      };
    }

    return comment;
  });
};

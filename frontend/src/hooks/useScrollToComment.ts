import { useEffect } from "react";
import { CommentType } from "../types/Comment/Comment";

// Define the hook
export const useScrollToComment = (
  commentId: number | undefined | null,
  comments: CommentType[],
  loadingTargetComment: boolean
) => {
  useEffect(() => {
    // Check if we have a valid commentId and comments are loaded
    if (commentId && comments.length > 0 && !loadingTargetComment) {
      const targetComment = document.getElementById(`comment-${commentId}`);
      if (targetComment) {
        targetComment.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [commentId, comments, loadingTargetComment]);
};

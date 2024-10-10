import { useEffect, useState } from "react";
import { CommentType } from "../types/Comment/Comment";

// Define the hook
export const useScrollToComment = (
  commentId: number | undefined | null,
  comments: CommentType[],
  loadingTargetComment: boolean
) => {
  const [hasScrolledToComment, setHasScrolledToComment] = useState(false);

  useEffect(() => {
    if (
      commentId &&
      comments.length > 0 &&
      !loadingTargetComment &&
      !hasScrolledToComment
    ) {
      const targetComment = document.getElementById(`comment-${commentId}`);
      if (targetComment) {
        targetComment.scrollIntoView({ behavior: "smooth" });
        setHasScrolledToComment(true);
      }
    }
  }, [commentId, comments, loadingTargetComment, hasScrolledToComment]);
};

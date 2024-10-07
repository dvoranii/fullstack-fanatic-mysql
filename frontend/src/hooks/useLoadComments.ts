import { useEffect } from "react";
import { fetchTopLevelComments } from "../services/commentService";
import { CommentType } from "../types/Comment/Comment";

interface UseLoadCommentsProps {
  contentId: number;
  contentType: string;
  page: number;
  commentId: number | undefined | null;
  TOP_LEVEL_BATCH_SIZE: number;
  comments: CommentType[];
  loadingTargetComment: boolean;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLoadingTargetComment: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLoadComments = ({
  contentId,
  contentType,
  page,
  commentId,
  TOP_LEVEL_BATCH_SIZE,
  comments,
  loadingTargetComment,
  setComments,
  setHasMore,
  setPage,
  setLoadingTargetComment,
}: UseLoadCommentsProps) => {
  useEffect(() => {
    const loadComments = async () => {
      try {
        const { comments: fetchedComments, hasMore: more } =
          await fetchTopLevelComments(
            contentType,
            contentId,
            page,
            TOP_LEVEL_BATCH_SIZE
          );

        // If no comments were fetched and there are no more comments to load
        if (fetchedComments.length === 0 && !more) {
          setHasMore(false);
          setLoadingTargetComment(false);
          return;
        }

        // Append the fetched comments to the existing ones
        setComments((prevComments) => [
          ...prevComments,
          ...fetchedComments.filter(
            (newComment) => !prevComments.some((c) => c.id === newComment.id)
          ),
        ]);
        setHasMore(more);

        // Check if the target comment is in the DOM after all comments have been loaded
        if (commentId && !document.getElementById(`comment-${commentId}`)) {
          if (more) {
            // If more comments exist, load the next page to continue searching
            setPage((prevPage) => prevPage + 1);
          } else {
            // If no more comments and target comment isn't found
            console.error("Target comment not found.");
            setLoadingTargetComment(false);
          }
        } else {
          setLoadingTargetComment(false);
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    if (loadingTargetComment) {
      loadComments();
    }
  }, [
    contentId,
    contentType,
    page,
    commentId,
    comments,
    loadingTargetComment,
    setComments,
    setHasMore,
    setPage,
    setLoadingTargetComment,
    TOP_LEVEL_BATCH_SIZE,
  ]);
};

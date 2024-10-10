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

        setComments((prevComments) => [
          ...prevComments,
          ...fetchedComments.filter(
            (newComment) => !prevComments.some((c) => c.id === newComment.id)
          ),
        ]);
        setHasMore(more);

        if (commentId) {
          const targetElement = document.getElementById(`comment-${commentId}`);

          if (targetElement || !more) {
            if (!targetElement) {
              console.warn(
                "Target comment not found in loaded comments but no more comments to fetch."
              );
            }
            setLoadingTargetComment(false);
          } else {
            if (more) {
              setPage((prevPage) => prevPage + 1);
            }
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

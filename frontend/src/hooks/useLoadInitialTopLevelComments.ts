import { useEffect } from "react";
import { fetchTopLevelComments } from "../services/commentService"; // Adjust the import based on your structure
import { CommentType } from "../types/Comment/Comment";

interface UseLoadInitialTopLevelCommentsProps {
  contentId: number;
  contentType: string;
  page: number;
  TOP_LEVEL_BATCH_SIZE: number;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useLoadInitialTopLevelComments = ({
  contentId,
  contentType,
  page,
  TOP_LEVEL_BATCH_SIZE,
  setComments,
  setHasMore,
  setError,
}: UseLoadInitialTopLevelCommentsProps) => {
  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const { comments: fetchedComments, hasMore } =
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

        setHasMore(hasMore);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setError("Failed to fetch comments");
      }
    };

    fetchCommentsData();
  }, [
    contentId,
    contentType,
    page,
    setComments,
    setHasMore,
    setError,
    TOP_LEVEL_BATCH_SIZE,
  ]);
};

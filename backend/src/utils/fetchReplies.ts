import { RowDataPacket } from "mysql2";
import { Comment } from "../types/Comment"; // Import your Comment type

export const fetchReplies = async (
  connection: any,
  parentCommentId: number,
  limit: number,
  offset: number,
  userId?: number
): Promise<{ replies: Comment[]; hasMore: boolean }> => {
  const replyQuery = `
    SELECT c.*, u.name as user_name, u.profile_picture, 
           EXISTS (SELECT 1 FROM comments r WHERE r.parent_comment_id = c.id) as has_replies
    FROM comments c 
    JOIN users u ON c.user_id = u.id 
    WHERE c.parent_comment_id = ?
    ORDER BY c.created_at ASC
    LIMIT ? OFFSET ?
  `;

  const [replies]: [RowDataPacket[]] = await connection.query(replyQuery, [
    parentCommentId,
    limit,
    offset,
  ]);

  const replyIds = replies.map((reply) => reply.id);

  let likedReplies: RowDataPacket[] = [];

  if (replyIds.length > 0 && userId) {
    [likedReplies] = await connection.query(
      `SELECT comment_id FROM comment_likes WHERE user_id = ? AND comment_id IN (?)`,
      [userId, replyIds]
    );
  }

  const likedReplyIds = likedReplies.map((row) => row.comment_id);

  const repliesWithLikedStatus: Comment[] = await Promise.all(
    replies.map(async (reply) => {
      // Fetch nested replies for each reply
      const { replies: nestedReplies, hasMore: nestedHasMore } =
        await fetchReplies(
          connection,
          reply.id,
          limit, // You can decide to limit nested replies differently if needed
          0, // Start from offset 0 for nested replies
          userId
        );

      return {
        id: reply.id,
        content_id: reply.content_id,
        content_type: reply.content_type,
        content: reply.content,
        created_at: reply.created_at,
        likes: reply.likes,
        user_id: reply.user_id,
        google_id: reply.google_id || null,
        user_name: reply.user_name,
        profile_picture: reply.profile_picture || null,
        parent_comment_id: reply.parent_comment_id,
        has_replies: reply.has_replies === 1,
        likedByUser: likedReplyIds.includes(reply.id),
        replies: nestedReplies, // Include the nested replies
        hasMoreReplies: nestedHasMore, // If needed, include whether more replies exist for this reply
      };
    })
  );

  const hasMore = repliesWithLikedStatus.length === limit;

  return { replies: repliesWithLikedStatus, hasMore };
};

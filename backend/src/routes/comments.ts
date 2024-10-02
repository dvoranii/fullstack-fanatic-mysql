import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Comment } from "../types/Comment";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

// Declare the recursive function at the top, outside of the router handler
const fetchRepliesRecursively = async (
  connection: any,
  commentId: number
): Promise<Comment[]> => {
  const replyQuery = `
    SELECT c.*, u.name as user_name, u.profile_picture 
    FROM comments c 
    JOIN users u ON c.user_id = u.id 
    WHERE c.parent_comment_id = ? 
    ORDER BY c.created_at ASC
  `;

  const [replies]: [RowDataPacket[]] = await connection.query(replyQuery, [
    commentId,
  ]);

  if (!replies || replies.length === 0) {
    return [];
  }

  const repliesWithNestedReplies: Comment[] = await Promise.all(
    replies.map(async (reply) => {
      const nestedReplies = await fetchRepliesRecursively(connection, reply.id); // Recursion
      return {
        ...(reply as unknown as Comment),
        replies: nestedReplies,
      };
    })
  );

  return repliesWithNestedReplies;
};

// Your main route handler
router.get(
  "/:contentType/:contentId",
  authenticate,
  async (req: Request, res: Response) => {
    const { contentType, contentId } = req.params;
    const userId = req.user?.userId;
    const includeLikedStatus = req.query.includeLikedStatus === "true";
    const page = parseInt(req.query.page as string) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    // `parentCommentId` is used to fetch replies for a specific comment
    const parentCommentId = req.query.parentCommentId
      ? parseInt(req.query.parentCommentId as string, 10)
      : null;

    try {
      const connection = await connectionPromise;

      // Define the query to fetch top-level comments (parentCommentId IS NULL) or replies
      let commentsQuery = `
        SELECT c.*, u.name as user_name, u.profile_picture, 
               EXISTS (SELECT 1 FROM comments r WHERE r.parent_comment_id = c.id) as has_replies 
        FROM comments c 
        JOIN users u ON c.user_id = u.id 
        WHERE c.content_type = ? AND c.content_id = ?
        ${
          parentCommentId
            ? "AND c.parent_comment_id = ?"
            : "AND c.parent_comment_id IS NULL"
        }
        ORDER BY c.created_at DESC
        LIMIT ? OFFSET ? 
      `;

      // Parameters depend on whether we are fetching top-level comments or replies
      const params = parentCommentId
        ? [contentType, contentId, parentCommentId, limit, offset]
        : [contentType, contentId, limit, offset];

      // Execute the query to fetch the comments (or replies)
      const [rows] = await connection.query<RowDataPacket[]>(
        commentsQuery,
        params
      );

      if (!rows || rows.length === 0) {
        return res.status(200).json({ comments: [], hasMore: false });
      }
      // Cast the rows to the Comment type
      let commentsWithReplies: Comment[] = rows as Comment[];

      // If we are fetching replies (parentCommentId is provided), fetch them recursively
      if (parentCommentId) {
        commentsWithReplies = await Promise.all(
          commentsWithReplies.map(async (comment) => {
            const replies = await fetchRepliesRecursively(
              connection,
              comment.id
            );

            console.log("First level reply: ", comment);
            console.log("Nested reply: ", replies);
            return {
              ...comment,
              replies, // Attach replies to the comment
            };
          })
        );
      }

      // If `includeLikedStatus` is true, apply liked status to each comment
      if (includeLikedStatus && userId) {
        const [likedComments] = await connection.query<RowDataPacket[]>(
          `SELECT comment_id FROM comment_likes WHERE user_id = ?`,
          [userId]
        );
        const likedCommentIds = likedComments.map((row) => row.comment_id);

        const setLikedStatus = (comments: Comment[]) => {
          comments.forEach((comment) => {
            comment.likedByUser = likedCommentIds.includes(comment.id);
            if (comment.replies && comment.replies.length > 0) {
              setLikedStatus(comment.replies); // Recursively set liked status for replies
            }
          });
        };

        setLikedStatus(commentsWithReplies);
      }

      const [totalCountResult] = await connection.query<RowDataPacket[]>(
        "SELECT COUNT(*) as total FROM comments WHERE content_type = ? AND content_id = ?",
        [contentType, contentId]
      );
      const totalCount = totalCountResult[0]?.total || 0;

      const hasMore = offset + limit < totalCount;

      // Return only the top-level comments or the replies based on the parentCommentId
      res.json({ comments: commentsWithReplies, hasMore });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

router.post("/", authenticate, async (req: Request, res: Response) => {
  const { content_id, content_type, content } = req.body as {
    content_id: number;
    content_type: "tutorial" | "blog";
    content: string;
    parent_comment_id?: number;
  };
  const { userId } = req.user!;

  try {
    const connection = await connectionPromise;
    const [results] = await connection.query<ResultSetHeader>(
      "INSERT INTO comments (content_id, content_type, content, user_id, parent_comment_id) VALUES (?, ?, ?, ?, ?)",
      [content_id, content_type, content, userId, null]
    );

    const [newComment] = await connection.query<RowDataPacket[]>(
      `SELECT c.*, u.name as user_name, u.profile_picture
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?`,
      [results.insertId]
    );

    res.json(newComment[0]);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { content } = req.body as { content: string };
  const { userId } = req.user!;
  try {
    const connection = await connectionPromise;
    const [existing] = await connection.query<RowDataPacket[]>(
      "SELECT user_id FROM comments WHERE id = ?",
      [id]
    );

    if (existing.length === 0 || existing[0].user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to edit this comment" });
    }

    await connection.query<ResultSetHeader>(
      "UPDATE comments SET content = ? WHERE id = ?",
      [content, id]
    );
    res.json({ id, content });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

router.post("/reply", authenticate, async (req: Request, res: Response) => {
  const { content_id, content_type, content, parent_comment_id } = req.body as {
    content_id: number;
    content_type: "tutorial" | "blog";
    content: string;
    parent_comment_id: number | null;
  };

  const { userId } = req.user!;

  try {
    const connection = await connectionPromise;

    const [results] = await connection.query<ResultSetHeader>(
      "INSERT INTO comments (content_id, content_type, content, user_id, parent_comment_id) VALUES (?, ?, ?, ?, ?)",
      [content_id, content_type, content, userId, parent_comment_id || null]
    );

    const [newReply] = await connection.query<RowDataPacket[]>(
      `SELECT c.*, u.name as user_name, u.profile_picture
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?`,
      [results.insertId]
    );

    if (newReply.length > 0) {
      const [parentCommentOwner] = await connection.query<RowDataPacket[]>(
        "SELECT user_id FROM comments WHERE id = ?",
        [parent_comment_id]
      );

      if (
        parentCommentOwner.length > 0 &&
        parentCommentOwner[0].user_id !== userId
      ) {
        await connection.execute(
          "INSERT INTO notifications (user_id, type, sender_id, is_read, created_at) VALUES (?, 'reply', ?, 0, NOW())",
          [parentCommentOwner[0].user_id, userId]
        );
      }

      res.json(newReply[0]);
    } else {
      res
        .status(500)
        .json({ error: "Failed to fetch the newly inserted reply." });
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

router.put(
  "/:id/toggle-like",
  authenticate,
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { userId } = req.user!;

    try {
      const connection = await connectionPromise;

      const [existingLike] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM comment_likes WHERE comment_id = ? AND user_id = ?",
        [id, userId]
      );

      if (existingLike.length > 0) {
        await connection.query<ResultSetHeader>(
          "DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?",
          [id, userId]
        );
      } else {
        await connection.query<ResultSetHeader>(
          "INSERT INTO comment_likes (comment_id, user_id) VALUES (?, ?)",
          [id, userId]
        );
      }

      const [likesResult] = await connection.query<RowDataPacket[]>(
        "SELECT COUNT(*) AS likes FROM comment_likes WHERE comment_id = ?",
        [id]
      );
      const totalLikes = likesResult[0].likes;

      await connection.query<ResultSetHeader>(
        "UPDATE comments SET likes = ? WHERE id = ?",
        [totalLikes, id]
      );

      const [commentOwner] = await connection.query<RowDataPacket[]>(
        "SELECT user_id FROM comments WHERE id = ?",
        [id]
      );

      if (commentOwner.length > 0 && commentOwner[0].user_id !== userId) {
        await connection.execute(
          "INSERT INTO notifications (user_id, type, sender_id, is_read, created_at) VALUES (?, 'like', ?, 0, NOW())",
          [commentOwner[0].user_id, userId]
        );
      }

      res.json({ id, likes: totalLikes });
    } catch (err) {
      const error = err as Error;
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { userId } = req.user!;

  try {
    const connection = await connectionPromise;
    const [existing] = await connection.query<RowDataPacket[]>(
      "SELECT user_id FROM comments WHERE id = ?",
      [id]
    );

    if (existing.length === 0 || existing[0].user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this comment" });
    }

    await connection.query<ResultSetHeader>(
      "DELETE FROM comments WHERE id = ?",
      [id]
    );

    res.json({ id });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

export default router;

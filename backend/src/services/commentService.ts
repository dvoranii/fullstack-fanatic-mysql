import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import connectionPromise from "../db";
import { Connection } from "mysql2/promise";

export const insertComment = async (
  content_id: number,
  content_type: string,
  content: string,
  userId: number,
  parent_comment_id: number | null
): Promise<number> => {
  const connection = await connectionPromise;
  const [results] = await connection.query<ResultSetHeader>(
    "INSERT INTO comments (content_id, content_type, content, user_id, parent_comment_id) VALUES (?, ?, ?, ?, ?)",
    [content_id, content_type, content, userId, parent_comment_id]
  );
  return results.insertId;
};

export const fetchCommentById = async (id: number): Promise<RowDataPacket> => {
  const connection = await connectionPromise;
  const [comment] = await connection.query<RowDataPacket[]>(
    `SELECT c.*, u.name as user_name, u.profile_picture 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.id = ?`,
    [id]
  );
  return comment[0];
};

export const updateComment = async (
  id: number,
  content: string
): Promise<void> => {
  const connection = await connectionPromise;
  await connection.query<ResultSetHeader>(
    "UPDATE comments SET content = ? WHERE id = ?",
    [content, id]
  );
};

export const fetchCommentOwner = async (
  commentId: number
): Promise<number | null> => {
  const connection = await connectionPromise;
  const [commentOwner] = await connection.query<RowDataPacket[]>(
    `SELECT user_id FROM comments WHERE id = ?`,
    [commentId]
  );
  return commentOwner.length > 0 ? commentOwner[0].user_id : null;
};

export const deleteComment = async (commentId: number): Promise<void> => {
  const connection = await connectionPromise;
  await connection.query<ResultSetHeader>("DELETE FROM comments WHERE id = ?", [
    commentId,
  ]);
};

export const toggleLike = async (
  commentId: number,
  userId: number
): Promise<number> => {
  const connection = await connectionPromise;

  const [existingLike] = await connection.query<RowDataPacket[]>(
    "SELECT * FROM comment_likes WHERE comment_id = ? AND user_id = ?",
    [commentId, userId]
  );

  if (existingLike.length > 0) {
    await connection.query<ResultSetHeader>(
      "DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?",
      [commentId, userId]
    );
  } else {
    await connection.query<ResultSetHeader>(
      "INSERT INTO comment_likes (comment_id, user_id) VALUES (?, ?)",
      [commentId, userId]
    );
  }

  const [likesResult] = await connection.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS likes FROM comment_likes WHERE comment_id = ?",
    [commentId]
  );
  const totalLikes = likesResult[0].likes;

  await connection.query<ResultSetHeader>(
    "UPDATE comments SET likes = ? WHERE id = ?",
    [totalLikes, commentId]
  );

  const [commentOwner] = await connection.query<RowDataPacket[]>(
    "SELECT user_id FROM comments WHERE id = ?",
    [commentId]
  );

  if (commentOwner.length > 0 && commentOwner[0].user_id !== userId) {
    await connection.execute(
      "INSERT INTO notifications (user_id, type, sender_id, is_read, created_at) VALUES (?, 'like', ?, 0, NOW())",
      [commentOwner[0].user_id, userId]
    );
  }

  return totalLikes;
};

export const fetchCommentLikes = async (userId: number): Promise<number[]> => {
  const connection = await connectionPromise;

  const [likedComments] = await connection.query<RowDataPacket[]>(
    "SELECT comment_id FROM comment_likes WHERE user_id = ?",
    [userId]
  );

  return likedComments.map((row) => row.comment_id);
};

export const fetchTotalComments = async (
  contentType: string,
  contentId: number
): Promise<number> => {
  const connection = await connectionPromise;

  const [totalCountResult] = await connection.query<RowDataPacket[]>(
    "SELECT COUNT(*) as total FROM comments WHERE content_type = ? AND content_id = ?",
    [contentType, contentId]
  );
  return totalCountResult[0]?.total || 0;
};

export async function findTopLevelComment(
  commentId: number,
  connection: Connection // Use the connection passed as a parameter
): Promise<RowDataPacket | null> {
  try {
    let currentCommentId = commentId;

    while (currentCommentId) {
      const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
        `SELECT id, parent_comment_id, content 
         FROM comments 
         WHERE id = ?`,
        [currentCommentId]
      );

      if (rows.length === 0) {
        console.log(`Comment with id ${currentCommentId} not found.`);
        return null;
      }

      const comment = rows[0];

      if (comment.parent_comment_id === null) {
        // If we reach a top-level comment, log and exit the loop
        console.log(`The top-level parent comment is:`, comment);
        return comment;
      } else {
        // Continue traversing upwards
        currentCommentId = comment.parent_comment_id;
      }
    }
  } catch (error) {
    console.error(
      "Error while traversing to find the top-level comment:",
      error
    );
  }
  return null;
}

import connectionPromise from "../db/db";


export const executeBlockActions = async (blockerId: number, blockedId: number): Promise<void> => {
    const pool = await connectionPromise;
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();
        await connection.execute(
            `INSERT IGNORE INTO blocked_users (blocker_id, blocked_id) VALUES (?,?)`, 
            [blockerId, blockedId]
        );
        
        // NOTIFICATIONS
        await connection.execute(
            `UPDATE notifications SET is_hidden = 1 WHERE sender_id = ? AND user_id = ?`, 
            [blockerId, blockedId]
        )

        // FOLLOW
        // Remove follow relationship if blocker is following the blocked user
        await connection.execute(
            `DELETE FROM followers WHERE follower_id = ? AND followed_id = ?`,
            [blockerId, blockedId]
        );
        
        // Remove follow relationship if blocked user is following the blocker
        await connection.execute(
            `DELETE FROM followers WHERE follower_id = ? AND followed_id = ?`,
            [blockedId, blockerId]
        );
        
        // Delete any follow notifications when blocking
        await connection.execute(
            `DELETE FROM notifications 
                WHERE (user_id = ? AND sender_id = ? AND type = 'follow')
                OR (user_id = ? AND sender_id = ? AND type = 'follow')`,
            [blockedId, blockerId, blockerId, blockedId]
        );


        // CONVERSATION
        await connection.execute(
            `UPDATE conversations 
             SET is_deleted_user1 = CASE WHEN user1_id = ? THEN 1 ELSE is_deleted_user1 END,
                 is_deleted_user2 = CASE WHEN user2_id = ? THEN 1 ELSE is_deleted_user2 END
             WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)`,
            [blockedId, blockedId, blockerId, blockedId, blockedId, blockerId]
        );

        // Comments
        await connection.execute(
            `INSERT INTO comment_visibility (comment_id, user_id, is_hidden)
             SELECT c.id, ?, TRUE
             FROM comments c
             WHERE c.user_id = ?
             ON DUPLICATE KEY UPDATE is_hidden = TRUE`,
            [blockedId, blockerId]  // blocked user can't see blocker's comments
          );
          
          // Hide blocked user's comments from blocker
        //   await connection.execute(
        //     `INSERT INTO comment_visibility (comment_id, user_id, is_hidden)
        //      SELECT c.id, ?, TRUE
        //      FROM comments c
        //      WHERE c.user_id = ?
        //      ON DUPLICATE KEY UPDATE is_hidden = TRUE`,
        //     [blockerId, blockedId]  // blocker can't see blocked user's comments
        //   );

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export const executeUnblockActions = async (blockerId: number, blockedId: number): Promise<void> => {
    const pool = await connectionPromise;
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();

        await connection.execute(
            `DELETE FROM blocked_users 
            WHERE blocker_id = ? 
            AND blocked_id = ?`, 
            [blockerId, blockedId]
        )

        // Notifications
        await connection.execute(
            `UPDATE notifications
            SET is_hidden = 0
            WHERE sender_id = ? AND user_id = ?`,
            [blockerId, blockedId]
        )

        // Restore visibility when unblocking
        await connection.execute(
            `UPDATE comment_visibility 
            SET is_hidden = FALSE
            WHERE (user_id = ? AND comment_id IN (SELECT id FROM comments WHERE user_id = ?))
                OR (user_id = ? AND comment_id IN (SELECT id FROM comments WHERE user_id = ?))`,
            [blockedId, blockerId, blockerId, blockedId]
        );

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error
    } finally {
        connection.release();
    }
}
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


        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error
    } finally {
        connection.release();
    }
}
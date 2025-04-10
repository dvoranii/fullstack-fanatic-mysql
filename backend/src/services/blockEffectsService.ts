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
        

        await connection.execute(
            `UPDATE notifications SET is_hidden = 1 WHERE sender_id = ? AND user_id = ?`, 
            [blockerId, blockedId]
        )
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
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
    }
}
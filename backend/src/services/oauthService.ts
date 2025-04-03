import { google } from 'googleapis';
import connectionPromise from '../db/db';
import { RowDataPacket } from 'mysql2';

export class OAuthService {
  private oauth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      process.env.OAUTH_REDIRECT_URI
    );
  }

  async getAccessToken(): Promise<string> {
    const connection = await connectionPromise;

    try {
      console.log('Fetching OAuth tokens from database...');
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM oauth_tokens LIMIT 1'
      );

      if (rows.length === 0) {
        throw new Error('No OAuth tokens found in database');
      }

      const tokenRecord = rows[0];
      console.log('Token record found:', {
        hasAccessToken: !!tokenRecord.accessToken,
        hasRefreshToken: !!tokenRecord.refreshToken,
        accessTokenExpiry: tokenRecord.accessTokenExpiry,
      });

      if (
        tokenRecord.accessTokenExpiry &&
        new Date(tokenRecord.accessTokenExpiry) > new Date()
      ) {
      
        return tokenRecord.accessToken;
      }

      
      if (!tokenRecord.refreshToken) {
        throw new Error('No refresh token available');
      }

      this.oauth2Client.setCredentials({
        refresh_token: tokenRecord.refreshToken,
      });

      const { token, res } = await this.oauth2Client.getAccessToken();

      if (!token) {
        throw new Error('Google OAuth returned empty access token');
      }


      const expiryDate = res?.data.expires_in
        ? new Date(Date.now() + res.data.expires_in * 1000)
        : null;

      await connection.execute(
        `UPDATE oauth_tokens
         SET accessToken = ?, accessTokenExpiry = ?
         WHERE id = ?`,
        [token, expiryDate, tokenRecord.id]
      );

      return token;
    } catch (error: unknown) {
      console.error('OAuth error details:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to refresh access token: ${error.message}`);
      }
      throw new Error(`Failed to refresh access token: ${String(error)}`);
    }

  }

  async getRefreshToken(): Promise<string> {
    const connection = await connectionPromise;
    console.log('Fetching refresh token from database...');
    
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT refreshToken FROM oauth_tokens LIMIT 1'
    );
    
    if (rows.length === 0 || !rows[0].refreshToken) {
      throw new Error('No refresh token found in database');
    }
    
    console.log('Refresh token found in database');
    return rows[0].refreshToken;
  }
}
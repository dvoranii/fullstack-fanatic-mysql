export interface OAuthToken {
    userId: number;
    refreshToken: string;
    accessToken?: string;
    accessTokenExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
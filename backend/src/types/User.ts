export interface UserPayload {
  userId: number;
  googleId: string;
  email: string;
  displayName?: string;
  profession?: string;
  bio?: string;
  socialLinks?: { [key: string]: string };
  bannerImage?: string;
}

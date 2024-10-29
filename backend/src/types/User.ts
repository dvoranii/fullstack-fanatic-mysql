export interface UserPayload {
  userId: number;
  googleId: string;
  email: string;
  displayName?: string;
  profile_picture?: string;
  profession?: string;
  bio?: string;
  socialLinks?: { [key: string]: string };
  bannerImage?: string;
  isPremium: boolean;
  premiumLevel?: "starter" | "casual pro" | "premium";
}

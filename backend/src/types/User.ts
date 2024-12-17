export interface UserPayload {
  userId: number;
  googleId: string;
  email: string;
  display_name?: string;
  profilePicture?: string;
  profession?: string;
  bio?: string;
  socialLinks?: { [key: string]: string };
  bannerImage?: string;
  isPremium: boolean;
  premiumLevel?: "starter" | "casual pro" | "premium";
  stripeCustomerId?: string;
}

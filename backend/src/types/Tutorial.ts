export interface Tutorial {
  id: number;
  title: string;
  created_at: string;
  isPremium: boolean;
  premiumLevel?: "starter" | "casual pro" | "premium";
}

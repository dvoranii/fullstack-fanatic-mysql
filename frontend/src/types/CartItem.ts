export interface CartItem {
  id: number;
  title: string;
  created_at?: string;
  price: number;
  description?: string;
  image?: string;
  isPremium?: boolean;
  premiumLevel?: "starter" | "casual pro" | "premium";
  availableForPurchase?: boolean;
  accessLevel?: "free" | "premium";
  type: "tutorial" | "blog" | "subscription";
  isPurchased?: boolean;
}

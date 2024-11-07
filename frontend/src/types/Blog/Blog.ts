import { Step } from "../Accordion";

// Core properties for a blog
export interface Blog {
  id: number;
  title: string;
  created_at: string;
  image: string;
  isPremium: boolean;
  premiumLevel?: "starter" | "casual pro" | "premium";
  availableForPurchase?: boolean;
  accessLevel: "free" | "premium";
  price?: number;
  isPurchased?: boolean;
}

export interface BlogContentItem extends Blog {
  steps: Step[];
}

import { Step } from "../Accordion";

export interface Blog {
  id: number;
  title: string;
  created_at: string;
  image: string;
  isPremium: boolean;
  premiumLevel?: "starter" | "casual pro" | "premium";
  availableForPurchase: boolean;
  accessLevel: "free" | "premium";
  price?: number;
}

export interface BlogContentItem extends Blog {
  steps: Step[];
}

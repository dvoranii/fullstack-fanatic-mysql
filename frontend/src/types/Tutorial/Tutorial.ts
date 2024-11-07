import { Step } from "../Accordion";

export interface Tutorial {
  id: number;
  title: string;
  created_at: string;
  image: string;
  isPremium: boolean;
  premiumLevel?: "starter" | "casual pro" | "premium";
  availableForPurchase: boolean;
  accessLevel: "free" | "premium";
  price?: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
}

export interface TutorialContentItem extends Tutorial {
  steps: Step[];
}

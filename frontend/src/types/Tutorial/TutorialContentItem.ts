import { Step } from "../Accordion";

export interface TutorialContentItem {
  id: number;
  title: string;
  created_at: string;
  steps: Step[];
  image: string;
  isPremium: boolean;
  availableForPurchase: boolean;
  accessLevel: "free" | "monthly" | "yearly" | "one-off";
  price?: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  backContent: string;
}

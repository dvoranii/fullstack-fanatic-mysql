import { Step } from "../Accordion";

export interface Tutorial {
  id: number;
  title: string;
  created_at: string;
  image: string;
  isPremium: boolean;
  availableForPurchase: boolean;
  accessLevel: "free" | "monthly" | "yearly";
  price?: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  backContent: string;
}

export interface TutorialContentItem extends Tutorial {
  steps: Step[]; // Add only additional properties specific to TutorialContentItem
}

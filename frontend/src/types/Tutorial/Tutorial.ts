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

// types/Tutorial/Tutorial.ts
export type TutorialTag = {
  id: string;
  label: string;
  color?: string;
  category?: 
    | "domain" 
    | "security" 
    | "level" 
    | "technology" 
    | "ui" 
    | "infrastructure" 
    | "methodology" 
    | "platform" 
    | "development" 
    | "phase"; 
  description?: string; 
};

export interface TutorialContentItem extends Tutorial {
  steps: Step[];
  tags: string[];
}

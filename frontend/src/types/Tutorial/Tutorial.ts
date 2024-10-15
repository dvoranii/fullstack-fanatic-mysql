export interface Tutorial {
  id: number;
  title: string;
  content: React.ReactNode;
  created_at: string;
  isFavourited: boolean;
  image: string;
  isPremium: boolean;
  availableForPurchase: boolean;
  accessLevel: "free" | "monthly" | "yearly" | "one-off";
  price?: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  backContent: string;
}

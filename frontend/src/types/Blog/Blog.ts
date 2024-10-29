export interface Blog {
  id: number;
  title: string;
  created_at: string;
  isFavourited: boolean;
  isPremium: boolean;
  accessLevel: "free" | "premium";
}

export interface Tutorial {
  id: number;
  title: string;
  content: React.ReactNode;
  created_at: string;
  isFavourited: boolean;
  image: string;
  isPremium: boolean;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  description?: string;
  image?: string;
  type: "tutorial" | "blog" | "subscription";
  priceId?: string;
}

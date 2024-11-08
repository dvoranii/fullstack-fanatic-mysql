export interface PurchasedItem {
  user_id: number;
  product_id: number;
  product_name: string;
  product_type: "tutorial" | "blog";
  price: number;
  purchase_type: string;
  access_expiry: Date | null;
}

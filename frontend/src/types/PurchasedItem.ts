export interface PurchasedItem {
  id: number;
  user_id: number;
  product_id: number;
  product_name: string;
  product_type: "tutorial" | "blog";
  price: number;
  purchase_type: string;
  purchase_date: string;
}

export interface PurchasedTutorial {
  user_id: number;
  product_id: number;
  product_name: string;
  product_type: string;
  price: number;
  purchase_type: string;
  access_expiry: Date | null;
}

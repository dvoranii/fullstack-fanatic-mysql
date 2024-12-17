import connectionPromise from "../db";

interface SessionMetadata {
  userId?: string;
  subscriptionType?: string;
  cartItems?: string;
}

interface CartItem {
  id: string;
  title: string;
  type: string;
  price: number;
  product_id?: string;
}

export const handleSubscriptionPurchase = async (metadata: SessionMetadata) => {
  const { userId, subscriptionType } = metadata;

  if (!userId) {
    throw new Error("User ID not found in session metadata");
  }

  let premiumLevel: string | null = null;

  switch (subscriptionType) {
    case "STARTER":
      premiumLevel = "starter";
      break;
    case "CASUAL PRO":
      premiumLevel = "casual pro";
      break;
    case "PREMIUM":
      premiumLevel = "premium";
      break;
    default:
      throw new Error("Invalid subscription type.");
  }

  if (premiumLevel) {
    const connection = await connectionPromise;

    const [rows]: any = await connection.execute(
      "SELECT premiumLevel FROM users WHERE id = ?",
      [userId]
    );
    const currentSubscription = rows[0]?.premiumLevel;

    if (
      currentSubscription === "premium" &&
      (premiumLevel === "starter" || premiumLevel === "casual pro")
    ) {
      throw new Error(
        "Cannot downgrade from a yearly subscription to a monthly plan."
      );
    }

    await connection.execute(
      "UPDATE users SET isPremium = 1, premiumLevel = ?, subscription_start_date = CURRENT_TIMESTAMP WHERE id = ?",
      [premiumLevel, userId]
    );
  }
};

export const handleOneOffPayments = async (metadata: SessionMetadata) => {
  const { userId, cartItems: cartItemsString } = metadata;

  if (!userId) {
    throw new Error("User ID not found in session metadata");
  }

  const cartItems: CartItem[] = cartItemsString
    ? JSON.parse(cartItemsString)
    : [];

  if (cartItems.length === 0) {
    throw new Error("No cart items found in session metadata");
  }

  const connection = await connectionPromise;

  for (const item of cartItems) {
    if ((item.type === "tutorial" || item.type === "blog") && item.product_id) {
      await connection.execute(
        "INSERT INTO purchases (user_id, product_id, product_name, product_type, price, purchase_type, access_expiry) VALUES (?, ?, ?, ?, ?, 'one-off', NULL)",
        [userId, item.product_id, item.title, item.type, item.price]
      );
    }
  }
};

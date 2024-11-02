// /services/subscriptionService.ts

import Stripe from "stripe";
import connectionPromise from "../db";

export const updateUserSubscription = async (
  session: Stripe.Checkout.Session
): Promise<void> => {
  try {
    const userId = session.metadata?.userId;

    if (!userId) {
      throw new Error("User ID not found in session metadata");
    }

    const subscriptionType = session.metadata?.subscriptionType;
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

      await connection.execute(
        "UPDATE users SET isPremium = 1, premiumLevel = ? WHERE id = ?",
        [premiumLevel, userId]
      );

      console.log(`User ${userId} updated to premium level: ${premiumLevel}`);
    }
  } catch (error) {
    console.error("Error updating user's premium level:", error);
    throw new Error("Failed to update user's premium level");
  }
};

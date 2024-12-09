import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { authenticate } from "../middleware/authenticate";
import { CartItem } from "../types/CartItem";
import Stripe from "stripe";
import connectionPromise from "../db";
import { csrfProtection } from "../middleware/csrf";

dotenv.config();

const router = express.Router();

(function () {
  const Stripe = require("stripe");
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey) {
    throw new Error(
      "Stripe secret key is not defined in environment variables"
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-09-30.acacia",
  });

  const getStripePriceId = (item: CartItem): string | null => {
    if (item.type === "tutorial") {
      if (Number(item.price) === 5.0) {
        return "price_1QAdG0Lg43ij91cKrppnUtez";
      } else if (Number(item.price) === 3.5) {
        return "price_1Q9VnYLg43ij91cKsu8U9CE0";
      }
    }

    if (item.type === "blog") {
      if (Number(item.price) === 2.5) {
        return "price_1QAdIlLg43ij91cKToTVoLHl";
      }
    }

    if (item.type === "subscription") {
      switch (item.title) {
        case "STARTER":
          return "price_1QCT2ZLg43ij91cKvrdh8tZJ";
        case "PREMIUM":
          return "price_1QAEHFLg43ij91cKJ9Ofrpt5";
        case "CASUAL PRO":
          return "price_1QAEHFLg43ij91cKjwxB2FCZ";
        default:
          return null;
      }
    }

    return null;
  };

  router.post(
    "/create-checkout-session-payment",
    authenticate,
    csrfProtection,
    async (req: Request, res: Response): Promise<void> => {
      const { cartItems } = req.body;

      if (!cartItems || cartItems.length === 0) {
        res.status(400).json({ error: "No items in cart" });
        return;
      }

      try {
        const lineItems = cartItems.map((item: CartItem) => {
          const priceId = getStripePriceId(item);
          if (!priceId) {
            throw new Error(`Invalid price for item: ${item.title}`);
          }

          return {
            price: priceId,
            quantity: 1,
          };
        });

        const simplifiedCartItems = cartItems.map((item: CartItem) => ({
          product_id: item.id,
          title: item.title,
          price: item.price,
          type: item.type,
        }));

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: lineItems,
          success_url: `${process.env.CLIENT_URL}/checkout/success`,
          cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
          metadata: {
            userId: req.user?.userId,
            email: req.user?.email,
            cartItems: JSON.stringify(simplifiedCartItems),
          },
        });

        res.json({ id: session.id });
      } catch (error) {
        console.error("Error creating Stripe checkout session: ", error);
        res.status(500).json({ error: "Failed to create checkout session" });
      }
    }
  );

  router.post(
    "/create-checkout-session-subscription",
    authenticate,
    csrfProtection,
    async (req: Request, res: Response): Promise<void> => {
      const { cartItems } = req.body;

      if (!cartItems || cartItems.length === 0) {
        res.status(400).json({ error: "No items in cart" });
        return;
      }

      try {
        const lineItems = cartItems.map((item: CartItem) => {
          const priceId = getStripePriceId(item);
          if (!priceId) {
            throw new Error(`Invalid price for item: ${item.title}`);
          }

          return {
            price: priceId,
            quantity: 1,
          };
        });

        const subscriptionItem = cartItems.find(
          (item: CartItem) => item.type === "subscription"
        );

        const subscriptionType = subscriptionItem?.title || "";

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "subscription",
          line_items: lineItems,
          success_url: `${process.env.CLIENT_URL}/checkout/success`,
          cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
          metadata: {
            userId: req.user?.userId,
            email: req.user?.email,
            subscriptionType,
          },
        });

        res.json({ id: session.id });
      } catch (error) {
        console.error("Error creating Stripe checkout session: ", error);
        res.status(500).json({ error: "Failed to create checkout session" });
      }
    }
  );

  router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response): Promise<void> => {
      const sig = req.headers["stripe-signature"];

      let event;

      try {
        if (!stripeWebhookSecret) {
          throw new Error(
            "Webhook secret is not defined in environment variables"
          );
        }

        event = stripe.webhooks.constructEvent(
          req.body,
          sig as string,
          stripeWebhookSecret
        );
      } catch (error) {
        console.error("Webhook signature verification failed.", error);
        res.status(400).send(`Webhook Error: ${(error as Error).message}`);
        return;
      }

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === "subscription") {
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
            }
          } catch (error) {
            console.error("Error updating user's premium level:", error);
            res
              .status(500)
              .json({ error: "Failed to update user's premium level" });
            return;
          }
        } else if (session.mode === "payment") {
          try {
            const userId = session.metadata?.userId;
            const cartItems = session.metadata?.cartItems
              ? JSON.parse(session.metadata.cartItems)
              : [];

            if (!userId) {
              throw new Error("User ID not found in session metadata");
            }

            const connection = await connectionPromise;

            for (const item of cartItems) {
              if (
                (item.type === "tutorial" || item.type === "blog") &&
                item.product_id
              ) {
                await connection.execute(
                  "INSERT INTO purchases (user_id, product_id, product_name, product_type, price, purchase_type, access_expiry) VALUES (?, ?, ?, ?, ?, 'one-off', NULL)",
                  [userId, item.product_id, item.title, item.type, item.price]
                );
              }
            }
          } catch (error) {
            console.error("Error recording one-off purchases: ", error);
            res
              .status(500)
              .json({ error: "Failed to record one-off purchases" });
            return;
          }
        }
      }

      res.sendStatus(200);
    }
  );
})();

export default router;

import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { authenticate } from "../middleware/authenticate";
import { CartItem } from "../types/CartItem";
import Stripe from "stripe";

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
    // Handle tutorial and blog items based on their price
    if (item.type === "tutorial" || item.type === "blog") {
      if (item.price === 5.0) {
        return "price_1QAdG0Lg43ij91cKrppnUtez"; // Tutorial price for $5.0
      } else if (item.price === 3.5) {
        return "price_1Q9VnYLg43ij91cKsu8U9CE0"; // Tutorial price for $3.5
      }
    }

    // Handle subscription items based on their title
    if (item.type === "subscription") {
      switch (item.title) {
        case "STARTER":
          return "price_1QCT2ZLg43ij91cKvrdh8tZJ"; // Price ID for $7 subscription
        case "PREMIUM":
          return "price_1QAEHFLg43ij91cKJ9Ofrpt5"; // Price ID for $125 subscription
        case "CASUAL PRO":
          return "price_1QAEHFLg43ij91cKjwxB2FCZ"; // Price ID for $20 subscription
        default:
          return null; // Invalid title or not handled
      }
    }

    return null; // If item does not match any case
  };

  // Create checkout session
  router.post(
    "/create-checkout-session-payment",
    authenticate,
    async (req: Request, res: Response) => {
      const { cartItems } = req.body;

      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: "No items in cart" });
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

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: lineItems,
          success_url: `${process.env.CLIENT_URL}/checkout/success`,
          cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
          metadata: {
            userId: req.user?.userId,
            email: req.user?.email,
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
    async (req: Request, res: Response) => {
      const { cartItems } = req.body;

      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: "No items in cart" });
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

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "subscription",
          line_items: lineItems,
          success_url: `${process.env.CLIENT_URL}/checkout/success`,
          cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
          metadata: {
            userId: req.user?.userId,
            email: req.user?.email,
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
    async (req: Request, res: Response) => {
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
        return res
          .status(400)
          .send(`Webhook Error: ${(error as Error).message}`);
      }

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Payment was successful for session: ", session);
      }

      res.json({ received: true });
    }
  );
})();

export default router;

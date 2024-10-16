import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { authenticate } from "../middleware/authenticate";
import { CartItem } from "../types/CartItem";

dotenv.config();

const router = express.Router();

// Wrap CommonJS part in IIFE
(function () {
  const Stripe = require("stripe");
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error(
      "Stripe secret key is not defined in environment variables"
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-09-30.acacia",
  });

  const getStripePriceId = (item: CartItem): string | null => {
    if (item.price === 5.0) {
      return "price_1QAdG0Lg43ij91cKrppnUtez";
    } else if (item.price === 3.5) {
      return "price_1Q9VnYLg43ij91cKsu8U9CE0";
    } else {
      return null;
    }
  };

  router.post(
    "/create-checkout-session",
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
})();

export default router;

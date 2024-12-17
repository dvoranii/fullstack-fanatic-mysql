import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { authenticate } from "../middleware/authenticate";
import { CartItem } from "../types/CartItem";
import Stripe from "stripe";
import { csrfProtection } from "../middleware/csrf";
import {
  handleSubscriptionPurchase,
  handleOneOffPayments,
} from "../utils/webhookUtils";
const { stripe, STRIPE_WEBHOOK_SECRET } = require("../utils/stripeClient");
import connectionPromise from "../db";
import { RowDataPacket } from "mysql2";
import { planMapping } from "../config/planMapping";

dotenv.config();

const router = express.Router();

interface StripeCustomerIdRow {
  stripe_customer_id: string | null;
}

(function () {
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
      const { cartItems, display_name } = req.body;

      if (!cartItems || cartItems.length === 0) {
        res.status(400).json({ error: "No items in cart" });
        return;
      }

      try {
        const connection = await connectionPromise;

        // Step 1: Retrieve the user's Stripe customer ID
        const [rows] = await connection.execute<RowDataPacket[]>(
          "SELECT stripe_customer_id FROM users WHERE id = ?",
          [req.user?.userId]
        );

        let stripeCustomerId = rows[0]?.stripe_customer_id || null;

        // Step 2: Create a new customer if it doesn't exist
        if (!stripeCustomerId) {
          const customer = await stripe.customers.create({
            email: req.user?.email,
            name: display_name || req.user?.display_name || "Anonymous",
            metadata: { userId: String(req.user?.userId) },
          });

          stripeCustomerId = customer.id;

          // Update the database with the new Stripe customer ID
          await connection.execute(
            "UPDATE users SET stripe_customer_id = ? WHERE id = ?",
            [stripeCustomerId, req.user?.userId]
          );
        }

        // Step 3: Prepare line items for the subscription
        const lineItems = cartItems.map((item: CartItem) => {
          if (!item.priceId) {
            throw new Error(`Price ID is missing for item: ${item.title}`);
          }

          return {
            price: item.priceId,
            quantity: 1,
          };
        });

        const subscriptionItem = cartItems.find(
          (item: CartItem) => item.type === "subscription"
        );

        const subscriptionType = subscriptionItem?.title || "";

        // Step 4: Create the checkout session with the customer ID
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "subscription",
          customer: stripeCustomerId, // <-- Pass the customer ID here
          line_items: lineItems,
          success_url: `${process.env.CLIENT_URL}/checkout/success`,
          cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
          metadata: {
            userId: req.user?.userId,
            email: req.user?.email,
            subscriptionType,
            display_name,
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
    "/switch-subscription",
    authenticate,
    csrfProtection,
    async (req: Request, res: Response) => {
      const { newPlanPriceId } = req.body;
      const userId = req.user?.userId;

      console.log(newPlanPriceId);

      if (!newPlanPriceId) {
        return res
          .status(400)
          .json({ error: "New plan price ID is required." });
      }

      try {
        const connection = await connectionPromise;

        const [rows] = await connection.execute<RowDataPacket[]>(
          "SELECT stripe_customer_id FROM users WHERE id = ?",
          [userId]
        );

        const stripeCustomerId = rows[0]?.stripe_customer_id;
        if (!stripeCustomerId) {
          return res
            .status(404)
            .json({ error: "Stripe customer ID not found" });
        }

        const subscriptions = await stripe.subscriptions.list({
          customer: stripeCustomerId,
          status: "active",
        });

        console.log(subscriptions);

        if (!subscriptions.data.length) {
          return res
            .status(400)
            .json({ error: "No active subscription found for this user" });
        }

        const currentSubscription = subscriptions.data[0];
        const currentPriceId = currentSubscription.items.data[0].price.id;

        const currentPlan =
          planMapping[currentPriceId as keyof typeof planMapping];
        const newPlan = planMapping[newPlanPriceId as keyof typeof planMapping];

        if (!currentPlan || !newPlan) {
          return res.status(400).json({ error: "Invalid plan selected" });
        }

        if (
          currentPlan.duration === "yearly" &&
          newPlan.duration === "monthly"
        ) {
          return res.status(400).json({
            error: "Cannot downgrade from a yearly plan to a monthly plan.",
          });
        }

        await stripe.subscriptions.update(currentSubscription.id, {
          items: [
            {
              id: currentSubscription.items.data[0].id,
              price: newPlanPriceId,
            },
          ],
          proration_behavior: "create_prorations",
        });

        const updatedPremiumLevel =
          newPlan.duration === "yearly"
            ? "premium"
            : newPlan.name.toLowerCase();

        await connection.execute(
          "UPDATE users SET premiumLevel = ? WHERE id = ?",
          [updatedPremiumLevel, userId]
        );

        res.status(200).json({
          message: `Successfully switched to the ${newPlan.name} subscription.`,
        });
      } catch (error) {
        console.error("Error switching subscription:", error);
        res.status(500).json({ error: "Failed to switch subscription" });
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
        if (!STRIPE_WEBHOOK_SECRET) {
          throw new Error(
            "Webhook secret is not defined in environment variables"
          );
        }

        event = stripe.webhooks.constructEvent(
          req.body,
          sig as string,
          STRIPE_WEBHOOK_SECRET
        );
      } catch (error) {
        console.error("Webhook signature verification failed:", error);
        res.status(400).send(`Webhook Error: ${(error as Error).message}`);
        return;
      }

      // Handle checkout.session.completed
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === "subscription") {
          const userId = session.metadata?.userId;
          const email = session.metadata?.email;
          const stripeCustomerId = session.customer as string;

          if (!userId || !email || !stripeCustomerId) {
            console.error("Missing user data in session metadata");
            res.status(400).send("Missing user data");
            return;
          }

          try {
            const connection = await connectionPromise;

            // Step 1: Update the stripe_customer_id if it's not already in the database
            const [rows] = await connection.execute<RowDataPacket[]>(
              "SELECT stripe_customer_id FROM users WHERE id = ?",
              [userId]
            );

            const existingCustomerId = rows[0]?.stripe_customer_id || null;

            if (!existingCustomerId) {
              await connection.execute(
                "UPDATE users SET stripe_customer_id = ? WHERE id = ?",
                [stripeCustomerId, userId]
              );
              console.log(`Updated Stripe customer ID for user ${userId}`);
            }

            // Step 2: Finalize subscription purchase
            console.log(
              `Finalizing subscription for user ${userId}, customer ID: ${stripeCustomerId}`
            );
            await handleSubscriptionPurchase(session.metadata || {});
          } catch (error) {
            console.error("Error processing subscription webhook:", error);
            res.status(500).send("Failed to process subscription webhook");
            return;
          }
        }

        // Handle one-off payments
        if (session.mode === "payment") {
          try {
            console.log("Processing one-off payment...");
            await handleOneOffPayments(session.metadata || {});
          } catch (error) {
            console.error("Error processing one-off payment webhook:", error);
            res.status(500).send("Failed to process one-off payment webhook");
            return;
          }
        }
      }

      res.sendStatus(200);
    }
  );
})();

export default router;

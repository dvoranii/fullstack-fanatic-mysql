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
  const getOrCreateStripeCustomer = async (
    userId: number,
    email: string,
    displayName: string | null
  ): Promise<string> => {
    const connection = await connectionPromise;

    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT stripe_customer_id FROM users WHERE id = ?",
      [userId]
    );

    let stripeCustomerId = rows[0]?.stripe_customer_id || null;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email,
        name: displayName,
        metadata: { userId: String(userId) },
      });

      stripeCustomerId = customer.id;

      await connection.execute(
        "UPDATE users SET stripe_customer_id = ? WHERE id = ?",
        [stripeCustomerId, userId]
      );
    }
    return stripeCustomerId;
  };

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
      const userId = req.user?.userId;
      const email = req.user?.email;
      const display_name =
        req.user?.display_name || req.user?.name || "Anonymous";

      if (!userId) {
        res.status(400).json({ error: "User ID is required but not found." });
        return;
      }

      if (!email) {
        res.status(400).json({ error: "Email is required but not found." });
        return;
      }

      if (!cartItems || cartItems.length === 0) {
        res.status(400).json({ error: "No items in cart" });
        return;
      }

      try {
        const stripeCustomerId = await getOrCreateStripeCustomer(
          userId,
          email,
          display_name
        );

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
      const userId = req.user?.userId || 0;
      const email = req.user?.email || "";
      const display_name =
        req.user?.display_name || req.user?.name || "Anonymous";

      console.log(req.user);

      if (!userId) {
        res.status(400).json({ error: "User ID is required but not found." });
        return;
      }

      if (!email) {
        res.status(400).json({ error: "Email is required but not found." });
        return;
      }

      if (!cartItems || cartItems.length === 0) {
        res.status(400).json({ error: "No items in cart" });
        return;
      }

      try {
        let stripeCustomerId = await getOrCreateStripeCustomer(
          userId,
          email,
          display_name
        );

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

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "subscription",
          customer: stripeCustomerId,
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
    async (req: Request, res: Response): Promise<void> => {
      const { newPlanPriceId } = req.body;
      const userId = req.user?.userId;
      const email = req.user?.email;
      const display_name =
        req.user?.display_name || req.user?.name || "Anonymous";

      // Guard clauses
      if (!userId) {
        res.status(400).json({ error: "User ID is required." });
        return;
      }

      if (!email) {
        res.status(400).json({ error: "Email is required." });
        return;
      }

      if (!newPlanPriceId) {
        res.status(400).json({ error: "New plan price ID is required." });
        return;
      }
      const connection = await connectionPromise;
      const [rows] = await connection.execute<RowDataPacket[]>(
        "SELECT premiumLevel, stripe_customer_id FROM users WHERE id = ?",
        [userId]
      );

      if (!rows[0]?.premiumLevel) {
        res.status(400).json({
          error:
            "Cannot switch subscription - no active subscription found. Please purchase a subscription first.",
        });
        return;
      }

      let stripeCustomerId = rows[0]?.stripe_customer_id;
      if (!stripeCustomerId) {
        try {
          stripeCustomerId = await getOrCreateStripeCustomer(
            userId,
            email,
            display_name
          );

          await connection.execute(
            "UPDATE users SET stripe_customer_id = ? WHERE id = ?",
            [stripeCustomerId, userId]
          );
        } catch (error) {
          console.error("Error creating Stripe customer:", error);
          res.status(500).json({ error: "Failed to create Stripe customer." });
          return;
        }
      }

      try {
        const subscriptions = await stripe.subscriptions.list({
          customer: stripeCustomerId,
          status: "active",
        });

        if (!subscriptions.data.length) {
          console.error(
            `User ${userId} has premiumLevel but no active Stripe subscription`
          );
          res.status(400).json({
            error:
              "There was an issue with your subscription. Please contact support.",
          });
          return;
        }

        const currentSubscription = subscriptions.data[0];
        const currentPriceId = currentSubscription.items.data[0].price.id;

        const currentPlan =
          planMapping[currentPriceId as keyof typeof planMapping];
        const newPlan = planMapping[newPlanPriceId as keyof typeof planMapping];

        if (!currentPlan || !newPlan) {
          res.status(400).json({ error: "Invalid plan selected" });
          return;
        }

        if (
          currentPlan.duration === "yearly" &&
          newPlan.duration === "monthly"
        ) {
          res.status(400).json({
            error: "Cannot downgrade from a yearly plan to a monthly plan.",
          });
          return;
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
        return;
      } catch (error) {
        console.error("Error switching subscription:", error);
        res.status(500).json({ error: "Failed to switch subscription" });
        return;
      }
    }
  );

  router.post(
    "/cancel-subscription",
    authenticate,
    csrfProtection,
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(400).json({ error: "User ID is required." });
        return;
      }

      try {
        const connection = await connectionPromise;
        const [rows] = await connection.execute<RowDataPacket[]>(
          "SELECT stripe_customer_id FROM users WHERE id = ?",
          [userId]
        );

        const stripeCustomerId = rows[0]?.stripe_customer_id;

        if (!stripeCustomerId) {
          res.status(400).json({ error: "No Stripe customer ID found." });
          return;
        }

        const subscriptions = await stripe.subscriptions.list({
          customer: stripeCustomerId,
          status: "active",
        });

        if (subscriptions.data.length === 0) {
          res.status(400).json({ error: "No active subscription found." });
          return;
        }

        const activeSubscription = subscriptions.data[0];

        if (!activeSubscription.cancel_at_period_end) {
          await stripe.subscriptions.update(activeSubscription.id, {
            cancel_at_period_end: true,
          });
        }

        const cancellationDate = new Date(
          activeSubscription.current_period_end * 1000
        );

        await connection.execute(
          "UPDATE users SET subscription_cancellation_date = ? WHERE id = ?",
          [cancellationDate, userId]
        );

        res.status(200).json({
          message: `Your subscription will be canceled at the end of the current billing period on ${cancellationDate.toLocaleDateString()}.`,
        });
      } catch (error) {
        console.error("Error canceling subscription: ", error);
        res.status(500).json({
          error: "An error occurred while canceling the subscription.",
        });
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

      if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          console.error("Missing userId in subscription metadata");
          res.status(400).send("Missing user data");
          return;
        }

        try {
          const connection = await connectionPromise;

          await connection.execute(
            "UPDATE users SET premiumLevel = null, subscription_start_date = null WHERE id = ?",
            [userId]
          );
          console.log(`Subscription canceled for user ${userId}`);
          res.status(200).send("Subscription canceled and user updated.");
        } catch (error) {
          console.error(
            "Error updating user on subscription cancellation:",
            error
          );
          res
            .status(500)
            .send("Failed to update user on subscription cancellation");
        }
      }

      res.sendStatus(200);
    }
  );
})();

export default router;

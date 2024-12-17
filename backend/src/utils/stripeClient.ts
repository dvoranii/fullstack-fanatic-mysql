const Stripe = require("stripe");
const dotenv = require("dotenv");

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined in environment variables");
}

if (!stripeWebhookSecret) {
  throw new Error(
    "Stripe webhook secret is not defined in environment variables"
  );
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-09-30.acacia",
});

export const STRIPE_WEBHOOK_SECRET = stripeWebhookSecret;

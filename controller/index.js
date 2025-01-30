import express from "express";
import Stripe from "stripe";
import Subscription from "../model/index.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PLANS = {
    Personal: process.env.Personal?.trim(),
    Starter: process.env.Starter?.trim(),
    Business: process.env.Business?.trim(),
  };

export const subscription = async (req, res) => {
  const { walletAddress, plan } = req.body;

  if (!PLANS[plan]) {
    return res.status(400).json({ error: "Invalid plan selected" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: PLANS[plan], quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL}`,
      cancel_url: `${process.env.FRONTEND_URL}`,
    });

    await Subscription.create({
      walletAddress,
      stripeSessionId: session.id,
      status: "active",
      plan,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: "Subscription failed", details: error });
  }
};

export const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      walletAddress: req.params.walletAddress,
    });
    if (!subscription)
      return res.status(404).json({ message: "No subscription found" });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: "Error fetching subscription" });
  }
};

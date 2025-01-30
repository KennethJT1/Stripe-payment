import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    walletAddress: { type: String, required: true, unique: true },
    stripeSessionId: { type: String, required: true },
    status: { type: String, enum: ["active", "cancelled"], default: "active" },
    plan: {
      type: String,
      enum: ["Personal", "Starter", "Business"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", SubscriptionSchema);

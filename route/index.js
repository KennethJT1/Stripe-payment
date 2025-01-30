import express from "express";
import { subscription, getSubscription } from "../controller/index.js";

const router = express.Router();

router.post("/subscribe", subscription);

router.get("/subscription/:walletAddress", getSubscription);

export default router;

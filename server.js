import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import subscriptionRoutes from "./route/index.js";
import { db } from "./dbConfig.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Stripe Subscription API is running");
});

app.use("/api", subscriptionRoutes);

app.listen(PORT, async () => {
  try {
    await db();

    console.log(`Server is running on PORT ${PORT}`);
  } catch (e) {
    console.log(`Error ${e.message}`);
  }
});

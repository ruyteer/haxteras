import express from "express";
import cors from "cors";
import {
  categoryRoutes,
  couponRoutes,
  orderRoutes,
  productRoutes,
} from "./routes";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/coupon", couponRoutes);
app.use("/order", orderRoutes);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const event = req.body;

    switch (event.type) {
      case "payment_intent.created":
        break;
      case "payment_intent.succeeded":
        console.log("deu certo");
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
);

export { app };

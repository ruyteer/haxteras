import express from "express";
import cors from "cors";
import {
  categoryRoutes,
  couponRoutes,
  orderRoutes,
  productRoutes,
  userRoutes,
} from "./routes";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/coupon", couponRoutes);
app.use("/order", orderRoutes);
app.use("/user", userRoutes);

export { app };

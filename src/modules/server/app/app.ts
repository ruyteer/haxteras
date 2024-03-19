import express from "express";
import cors from "cors";
import {
  avaibleBotsRouter,
  categoryRoutes,
  couponRoutes,
  nenbotRoutes,
  orderRoutes,
  productRoutes,
  userRoutes,
} from "./routes";
import { newsletterRoutes } from "./routes/newsletter";
import { adminLoginRouter } from "./routes/login-adm";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/coupon", couponRoutes);
app.use("/order", orderRoutes);
app.use("/user", userRoutes);
app.use("/nenbot", nenbotRoutes);
app.use("/avaiable-bots", avaibleBotsRouter);
app.use("/newsletter", newsletterRoutes);
app.use("/admin", adminLoginRouter);

export { app };

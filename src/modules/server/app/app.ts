import express from "express";
import cors from "cors";
import { categoryRoutes, couponRoutes, productRoutes } from "./routes";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/coupon", couponRoutes);

export { app };

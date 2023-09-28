import express from "express";
import { categoryRoutes, productRoutes } from "./routes";
const app = express();

app.use(express.json());
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);

export { app };

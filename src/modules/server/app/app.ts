import express from "express";
import { productRoutes } from "./routes/product";
const app = express();

app.use(express.json());
app.use("/product", productRoutes);

export { app };

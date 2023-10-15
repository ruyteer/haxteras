import express from "express";
import cors from "cors";
import {
  categoryRoutes,
  couponRoutes,
  orderRoutes,
  productRoutes,
  userRoutes,
} from "./routes";
import Stripe from "stripe";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/coupon", couponRoutes);
app.use("/order", orderRoutes);
app.use("/user", userRoutes);

app.get("/", async (req, res) => {
  const stripe = new Stripe(
    "sk_test_51NOmpNIRbkxCjPq71D3jc44UcCuhTib6x7mcDb2KxaT2Gm6cHqOPuo67ICyPuQE5Mco9IOOwrDBVghyaFEuW3YEn00AWHaKBl1",
    {
      apiVersion: "2023-08-16",
    }
  );

  //pi_3O17xNIRbkxCjPq70pHAaMBL
  const list = await stripe.charges.list();
  //   payment_intent: "pi_3O1Wu7IRbkxCjPq71TLFb46I",
  // });

  const customer = await stripe.customers.list();

  const filterCustomer = customer.data.filter(
    (result) => result.id === "cus_OpBGfEHaNjXux8"
  );
  res.send(filterCustomer);
});

export { app };

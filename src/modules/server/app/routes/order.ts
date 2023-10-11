import { Router } from "express";
import { makeIntent } from "../factories/order/make-intent";
import { CreateIntentController } from "../../../presentation/controllers/order/create-intent";
import { controller } from "../adapters/controller";

const orderRoutes = Router();

orderRoutes.post(
  "/create/intent",
  controller(makeIntent(CreateIntentController))
);

export { orderRoutes };

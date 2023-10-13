import { Router } from "express";
import { makeIntent } from "../factories/order/make-intent";
import { CreateIntentController } from "../../../presentation/controllers/order/create-intent";
import { controller } from "../adapters/controller";
import { WebhookController } from "../../../presentation/controllers/order/webhook";

const orderRoutes = Router();

orderRoutes.post(
  "/create/intent",
  controller(makeIntent(CreateIntentController))
);

orderRoutes.post("/webhook", controller(new WebhookController()));

export { orderRoutes };

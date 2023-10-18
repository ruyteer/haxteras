import { Router } from "express";
import { makeIntent } from "../factories/order/make-intent";
import { CreateIntentController } from "../../../presentation/controllers/order/create-intent";
import { controller } from "../adapters/controller";
import { makeStripe } from "../factories/order/make-stripe";
import { CreateOrderController } from "../../../presentation/controllers/order/create";
import { makeWebhook } from "../factories/order/make-webhook";
import { upload } from "../../../infra/services/multer/multer-config";
import { middleware } from "../adapters/middleware";
import { makeUploadFile } from "../factories/middlewares/upload-file";

const orderRoutes = Router();

orderRoutes.post(
  "/create/intent",

  controller(makeIntent(CreateIntentController))
);

orderRoutes.post("/webhook", controller(makeWebhook()));

orderRoutes.post(
  "/create",
  upload.array("file"),
  middleware(makeUploadFile()),
  controller(makeStripe(CreateOrderController))
);

export { orderRoutes };

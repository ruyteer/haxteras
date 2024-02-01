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
import { makeOrderController } from "../factories/order/make-order";
import { FindManyOrdersController } from "../../../presentation/controllers/order/find-many";
import { FindUniqueOrderController } from "../../../presentation/controllers/order/find-unique";
import { UpdateOrdersController } from "../../../presentation/controllers/order/update";
import { SendOrderVoucherController } from "../../../presentation/controllers/order/send-voucher";
import { CreatePreferenceController } from "../../../presentation/controllers/order/create-mp";
import { UpdatePreferenceController } from "../../../presentation/controllers/order/update-preference";
import { MPWebhook } from "../../../presentation/controllers/order/mp-webhook";

const orderRoutes = Router();

orderRoutes.post(
  "/create/intent",

  controller(makeIntent(CreateIntentController))
);

orderRoutes.post("/webhook", controller(makeWebhook()));
orderRoutes.post("/mercadopago/webhook", controller(new MPWebhook()));

orderRoutes.post(
  "/create",
  upload.array("file"),
  middleware(makeUploadFile()),
  controller(makeStripe(CreateOrderController))
);

orderRoutes.post(
  "/update/:id",
  controller(makeOrderController(UpdateOrdersController))
);

orderRoutes.post("/preference", controller(new CreatePreferenceController()));
orderRoutes.post(
  "/preference/update",
  controller(new UpdatePreferenceController())
);

orderRoutes.get("/", controller(makeOrderController(FindManyOrdersController)));
orderRoutes.get(
  "/:id",
  controller(makeOrderController(FindUniqueOrderController))
);

orderRoutes.put(
  "/update/voucher",
  upload.array("file"),
  middleware(makeUploadFile()),
  controller(makeOrderController(SendOrderVoucherController))
);
export { orderRoutes };

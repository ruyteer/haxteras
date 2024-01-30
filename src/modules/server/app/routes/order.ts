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

orderRoutes.post(
  "/update/:id",
  controller(makeOrderController(UpdateOrdersController))
);

orderRoutes.get("/", controller(makeOrderController(FindManyOrdersController)));
orderRoutes.get(
  "/:id",
  controller(makeOrderController(FindUniqueOrderController))
);

orderRoutes.put(
  "/update/voucher",
  upload.single("file"),
  middleware(makeUploadFile()),
  controller(makeOrderController(SendOrderVoucherController))
);
export { orderRoutes };

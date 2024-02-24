import { Router } from "express";
import { controller } from "../adapters/controller";
import { makeProductController } from "../factories/product/make-controller";
import {
  CreateProductController,
  DeleteProductController,
  FindManyProductController,
  FindUniqueProductController,
  UpdateProductController,
} from "../../../presentation/controllers";
import { upload } from "../../../infra/services/multer/multer-config";
import { middleware } from "../adapters/middleware";
import { makeUploadFile } from "../factories/middlewares/upload-file";

const productRoutes = Router();

productRoutes.post(
  "/create/:id",
  upload.array("file"),
  middleware(makeUploadFile()),
  controller(makeProductController(CreateProductController))
);

productRoutes.get(
  "/",
  controller(makeProductController(FindManyProductController))
);

productRoutes.get(
  "/:id",
  controller(makeProductController(FindUniqueProductController))
);

productRoutes.delete(
  "/delete/:id",
  controller(makeProductController(DeleteProductController))
);

productRoutes.put(
  "/update/:id",
  upload.array("file"),
  middleware(makeUploadFile()),
  controller(makeProductController(UpdateProductController))
);

export { productRoutes };
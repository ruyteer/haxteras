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

const productRoutes = Router();

productRoutes.post(
  "/create/:id",
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
  controller(makeProductController(UpdateProductController))
);

export { productRoutes };

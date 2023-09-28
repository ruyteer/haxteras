import { Router } from "express";
import { controller } from "../adapters/controller";
import { makeCategoryController } from "../factories/category/make-controller";
import {
  CreateCategoryController,
  DeleCategoryController,
  FindAllProductsCategoryController,
  FindManyCategoryController,
  FindUniqueCategoryController,
} from "../../../presentation/controllers";

const categoryRoutes = Router();

categoryRoutes.post(
  "/create",
  controller(makeCategoryController(CreateCategoryController))
);
categoryRoutes.delete(
  "/delete/:id",
  controller(makeCategoryController(DeleCategoryController))
);

categoryRoutes.get(
  "/",
  controller(makeCategoryController(FindManyCategoryController))
);
categoryRoutes.get(
  "/:id",
  controller(makeCategoryController(FindUniqueCategoryController))
);
categoryRoutes.get(
  "/products/:id",
  controller(makeCategoryController(FindAllProductsCategoryController))
);

export { categoryRoutes };

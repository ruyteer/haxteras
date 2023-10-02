import { Router } from "express";
import { controller } from "../adapters/controller";
import { makeCouponController } from "../factories/coupon/make-controller";
import {
  CreateCouponController,
  DeleteCouponController,
  FindManyCouponController,
  FindUniqueCouponController,
  UpdateCouponController,
} from "../../../presentation/controllers";

const couponRoutes = Router();

couponRoutes.post(
  "/create",
  controller(makeCouponController(CreateCouponController))
);
couponRoutes.delete(
  "/delete/:id",
  controller(makeCouponController(DeleteCouponController))
);
couponRoutes.get(
  "/",
  controller(makeCouponController(FindManyCouponController))
);
couponRoutes.get(
  "/:id",
  controller(makeCouponController(FindUniqueCouponController))
);
couponRoutes.put(
  "/update/:id",
  controller(makeCouponController(UpdateCouponController))
);

export { couponRoutes };

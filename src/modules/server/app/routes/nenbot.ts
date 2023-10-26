import { Router } from "express";
import { controller } from "../adapters/controller";
import { makeNenbotController } from "../factories/bot/make-bot";
import {
  CreateNenbotController,
  DeleteNenbotController,
  FindManyNenbotController,
  FindUniqueNenbotController,
} from "../../../presentation/controllers";

const nenbotRoutes = Router();

nenbotRoutes.post(
  "/create",
  controller(makeNenbotController(CreateNenbotController))
);

nenbotRoutes.get(
  "/",
  controller(makeNenbotController(FindManyNenbotController))
);
nenbotRoutes.get(
  "/:id",
  controller(makeNenbotController(FindUniqueNenbotController))
);

nenbotRoutes.delete(
  "/:id",
  controller(makeNenbotController(DeleteNenbotController))
);

export { nenbotRoutes };

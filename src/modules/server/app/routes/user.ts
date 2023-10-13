import { Router } from "express";
import { controller } from "../adapters/controller";
import { makeUserController } from "../factories/user/make-controller";
import {
  CreateUserController,
  DeleteUserController,
  FindManyUserController,
  FindUniqueUserController,
} from "../../../presentation/controllers";

const userRoutes = Router();

userRoutes.post(
  "/create",
  controller(makeUserController(CreateUserController))
);

userRoutes.delete(
  "/delete/:id",
  controller(makeUserController(DeleteUserController))
);

userRoutes.get(
  "/:id",
  controller(makeUserController(FindUniqueUserController))
);

userRoutes.get("/", controller(makeUserController(FindManyUserController)));

export { userRoutes };
